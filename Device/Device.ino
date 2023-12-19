#include <LittleFS.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ESPAsyncWebSrv.h>

#include "secrets.h"

#define WIFI_TIMEOUT 5000  // ms

#define AP_SSID "Sams"
#define AP_PASSWORD "12345678"

#define RESTART_DELAY 5000            // ms
#define FAILED_REQUEST_TIMEOUT 60000  // ms

String deviceId;
HTTPClient httpClient;
AsyncWebServer server(80);
DynamicJsonDocument device(1024);

const int pinSensorSonido = 32;

void fsInit() {
  /* Inicializar LittleFS normalmente. Si falla,
    intentar hacerlo con autoformateo */
  if (LittleFS.begin()) {
    Serial.println("Filesystem successfully initialized.");
    return;
  };

  if (LittleFS.begin(true)) {
    Serial.println("Filesystem successfully initialized with autoformat.");
    return;
  };

  Serial.println("Coulnd not initialize the filesystem.");
}

bool wifiConnect(String ssid, String password) {
  Serial.printf("Establishing WiFi connection to '%s'...\n", ssid.c_str());

  WiFi.begin(ssid, password);

  unsigned long startTime = millis();
  while (millis() - startTime < WIFI_TIMEOUT) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("WiFi connection established.");
      return true;
    };

    delay(100);
  }

  Serial.println("Could not establish WiFi connection.");
  return false;
}

void wifiInit() {
  Serial.println("Initializing WiFi connection...");

  File file = LittleFS.open("/wifi.json");
  if (!file) {
    Serial.println("There were no saved WiFi credentials.");
    return;
  }

  DynamicJsonDocument doc(512);
  DeserializationError error = deserializeJson(doc, file);
  file.close();
  if (error) {
    Serial.println("There was an error trying to deserialize the WiFi credentials.");
    return;
  }

  wifiConnect(doc["ssid"].as<String>(), doc["password"].as<String>());
}

bool wifiSave(String ssid, String password) {
  Serial.println("Saving WiFi credentials...");

  File file = LittleFS.open("/wifi.json", "w+");
  if (!file) {
    Serial.println("There was an error trying open the WiFi credentials file.");
    return false;
  }

  DynamicJsonDocument doc(512);
  doc["ssid"] = ssid;
  doc["password"] = password;
  bool dumped = serializeJson(doc, file);
  if (dumped) {
    Serial.println("WiFi credentials saved successfully.");
  } else {
    Serial.println("There was an error trying to save the WiFi credentials.");
  }

  file.close();
  return dumped;
}

bool saveDeviceId() {
  Serial.println("Saving device id...");

  File file = LittleFS.open("/deviceId.txt", "w+");
  if (!file) {
    Serial.println("There was an error trying open the device id file.");
    return false;
  }

  file.print(deviceId);
  file.close();

  return true;
}
void assignBoardId() {

  Serial.println("Getting device id...");

  File file = LittleFS.open("/deviceId.txt");
  if (file && file.size() > 0) {
    deviceId = file.readStringUntil('\n');
    file.close();

    Serial.printf("Device id: '%s'.\n", deviceId.c_str());
    return;
  }

  if (WiFi.status() != WL_CONNECTED) {
    return;
  }
  HTTPClient http;
  String url = API_URL + "/assign";
  http.begin(url);

  int httpResponseCode = http.GET();

  if (httpResponseCode == 200) {
    String response = http.getString();
    Serial.println("Response: " + response);

    // Parse JSON response
    StaticJsonDocument<256> jsonDocument;
    DeserializationError error = deserializeJson(jsonDocument, response);

    if (error) {
      Serial.println("Error parsing JSON.");
      return;
    }

    // Check if the "id" field exists in the JSON response
    if (jsonDocument.containsKey("id")) {
      deviceId = jsonDocument["id"].as<String>();
      Serial.println("Device ID: " + deviceId);
    } else {
      Serial.println("JSON response does not contain the 'id' field.");
    }
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();

  if (!deviceId) {
    Serial.println("There was an error trying to generate the device id.");
    return;
  }

  bool saved = saveDeviceId();
  if (saved) {
    Serial.println("Device id saved successfully.");
    return;
  }

  /* Error fatal ya que no se pudo guardar el id del dispositivo.
    Se reinicia el dispositivo completamente */
  Serial.println("There was a fatal error trying to save the device id.");
  Serial.printf("Restarting device in %dms...\n", RESTART_DELAY);
  delay(RESTART_DELAY);
  ESP.restart();
}

void handleServerRootRoute(AsyncWebServerRequest *request) {
  Serial.printf("[WebServer]: GET / @%s\n", request->client()->remoteIP().toString().c_str());

  String rootHTML = R"(<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Configurar Red</title>
    <style>
        * {
            margin: 0;
            padding: 0%;
            font-family: "poppins", sans-serif;
        }

        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: linear-gradient(to right,
                    rgb(55, 65, 81),
                    rgb(17, 24, 39),
                    rgb(0, 0, 0));
            background-position: center;
            background-size: cover;
        }

        section {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: fit-content;
        }

        .form-box {
            margin-top: 20px;
            position: relative;
            min-width: 310px;
            max-width: 80%;
            height: 350px;
            padding: 10px;
            background: transparent;
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 20px;
            backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        h2 {
            font-size: 2em;
            color: #fff;
            text-align: center;
        }

        .inputbox {
            position: relative;
            margin: 30px 0;
            width: 100%;
            border-bottom: 2px solid #fff;
        }

        .inputbox label {
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            color: #fff;
            font-size: 1em;
            pointer-events: none;
            transition: 0.5s;
        }

        input:focus~label,
        input:valid~label {
            top: -5px;
        }

        .inputbox input {
            width: 100%;
            height: 50px;
            background: transparent;
            border: none;
            outline: none;
            font-size: 1em;
            padding: 0 35px 0 5px;
            color: #fff;
        }

        .inputbox ion-icon {
            position: absolute;
            right: 8px;
            color: #fff;
            font-size: 1.2em;
            top: 20px;
        }

        button {
            width: 100%;
            height: 40px;
            border-radius: 40px;
            background: #fff;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
        }

        .id {
            width: 100%;
            color: #fff;
            text-align: center;
            font-weight: bold;
            text-wrap: wrap;
            margin-bottom: 10px;
            word-break: break-all;
        }

        #networks {
            margin-bottom: 20px;
            overflow: scroll;
        }

        .network-item {
            width: 100%;
            text-decoration: none;
            list-style: none;
            cursor: pointer;
            padding: 10px 0 10px 0;
            font-size: 20px;
            color: #fff;
            border-bottom: 1px solid #ffffff20;
            user-select: none;
        }

        .network-item p {
            margin-left: 10px;
        }

        .network-item:hover,
        .network-item:active {
            background-color: #ffffff80;
            animation-delay: .3s;
        }

        ul {
            width: 100%;
            height: 95%;
        }
    </style>
</head>

<body>
    <div class="form-box">
        <h2>Busca tu red</h2>
        <ul id="networks">
        </ul>
        <button type="submit" id="refresh">Refrescar</button>
    </div>
    <section>
        <div class="form-box">
            )";
  rootHTML += "<span class='id'>'" + deviceId + "'</span>";
  rootHTML += R"(
            <div class="form-value">
                <form action="/wifi" method="POST">
                    <h2>Configurar red</h2>
                    <div class="inputbox">
                        <input id="pass_id" type="text" name="ssid" required />
                        <label for="">SSID</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" id="password" name="password" required />
                        <label for="">Contraseña</label>
                    </div>
                    <button>Enviar</button>
                </form>
            </div>
        </div>
    </section>
    <script>
       const networksList = document.getElementById("networks"); // Parent element

// Use event delegation to capture click events on network items
networksList.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("network-item")) {
        // Check if the clicked element has the "network-item" class
        const clickedNetwork = e.target.querySelector("p").textContent;
        const ssid = document.getElementById("pass_id");
        ssid.value = clickedNetwork;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // When the page loads, fetch and display the Wi-Fi networks
    fetchNetworks();

    // Add a click event listener to the refresh button
    document.getElementById("refresh").addEventListener("click", function() {
        fetchNetworks();
    });
});

function fetchNetworks() {
    // Make an AJAX request to get the list of Wi-Fi networks
    fetch("/detect")
        .then(response => response.json())
        .then(data => {
            // Clear the existing list
            networksList.innerHTML = "";

            // Populate the list with the scanned Wi-Fi networks
            data.networks.forEach(network => {
                const li = document.createElement("li");
                li.classList.add("network-item");
                const p = document.createElement("p");
                p.textContent = network;
                li.appendChild(p);
                networksList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching networks:", error);
        });
}
    </script>
</body>

</html>)";

  request->send(200, "text/html", rootHTML);
}

void handleServerWifiRoute(AsyncWebServerRequest *request) {
  Serial.printf("[WebServer]: POST /wifi @%s\n", request->client()->remoteIP().toString().c_str());

  if (!request->hasParam("ssid", true) || !request->hasParam("password", true)) {
    return request->send(400, "text/plain", "Invalid request.");
  }

  String ssid = request->getParam("ssid", true)->value();
  String password = request->getParam("password", true)->value();

  bool connected = wifiConnect(ssid, password);
  if (!connected) {
    return request->send(401, "text/plain", "Invalid WiFi credentials.");
  }

  bool saved = wifiSave(ssid, password);
  if (!saved) {
    return request->send(500, "text/plain", "There was an internal server error trying to save the WiFi credentials.");
  }

  request->send(200, "text/plain", "WiFi successfully connected and saved.");
}

void setup() {
  Serial.begin(115200);

  // Inicializar sistema de archivos
  fsInit();

  // Inicializar WiFi desde el archivo guardado
  wifiInit();

  // Obtener el id del dispositivo
  assignBoardId();

  int numNetworks = WiFi.scanNetworks();

  // Create a JSON object to store the network names
  StaticJsonDocument<1024> jsonDocument;
  JsonArray networks = jsonDocument.createNestedArray("networks");

  // Add the network names to the JSON object
  for (int i = 0; i < numNetworks; i++) {
    networks.add(WiFi.SSID(i));
  }

  // Send the JSON response
  String jsonResponse;
  serializeJson(jsonDocument, jsonResponse);

  WiFi.softAP(AP_SSID, AP_PASSWORD);

  server.on("/", HTTP_GET, handleServerRootRoute);
  server.on("/wifi", HTTP_POST, handleServerWifiRoute);
  server.on("/detect", HTTP_GET, [jsonResponse](AsyncWebServerRequest *request) {
    request->send(200, "application/json", jsonResponse);
  });

  server.begin();
}
unsigned long previousSensorTime = 0;  // Variable para almacenar el tiempo anterior de lectura del sensor
unsigned long sensorInterval = 2000;   // Intervalo de lectura del sensor en milisegundos (2 segundos)

void loop() {

  unsigned long currentMillis = millis();  // Obtener el tiempo actual

  // Verificar si es tiempo de leer el sensor según el intervalo establecido
  if (currentMillis - previousSensorTime >= sensorInterval) {
    previousSensorTime = currentMillis;  // Actualizar el tiempo anterior de lectura del sensor

    int valorSensor1 = analogRead(pinSensorSonido);  // Leer el valor analógico del sensor

    // Esperar hasta que tenga conexión WiFi
    if (WiFi.status() != WL_CONNECTED) {
      delay(100);
      return;
    }

    // Si no tengo la id del dispositivo, la obtengo
    if (deviceId.isEmpty()) {
      assignBoardId();
      return;
    }

    // Example array of sensor data
    int sensorData[] = { valorSensor1, random(500), random(500), random(500), random(500), random(500) };
    // Initialize the HTTP client
    HTTPClient client;

    Serial.println(sensorData[0]);
    // Iterate over the array and send each element to the backend
    String jsonPayload = "{\"id\":\"" + deviceId + "\",";
    jsonPayload += "\"sensor1\":" + String(sensorData[0]) + ",";
    jsonPayload += "\"sensor2\":" + String(sensorData[1]) + ",";
    jsonPayload += "\"sensor3\":" + String(sensorData[2]) + ",";
    jsonPayload += "\"sensor4\":" + String(sensorData[3]) + ",";
    jsonPayload += "\"sensor5\":" + String(sensorData[4]) + ",";
    jsonPayload += "\"sensor6\":" + String(sensorData[5]);
    jsonPayload += "}";

    // Begin the HTTP request
    client.begin(API_URL + "/");
    client.addHeader("Content-Type", "application/json");

    // Send the POST request
    int httpResponseCode = client.PUT(jsonPayload);

    // Check the response code
    if (httpResponseCode > 0) {
      Serial.print("Request ");
      Serial.print(" - Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Request ");
      Serial.print(" - Response code: ");
      Serial.println(httpResponseCode);
    }

    // End the HTTP request
    client.end();
  }
}

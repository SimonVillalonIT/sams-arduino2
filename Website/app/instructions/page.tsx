"use client"

import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const InstructionsPage = () => (
  <section className="px-8">
    <h1 className="text-2xl font-bold text-primary">
      Pasos a seguir para utilizar tu SAMS
    </h1>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="font-medium" value="item-1">
        <AccordionTrigger className="font-semibold text-lg">
          1. Conexión a su NodeMCU
        </AccordionTrigger>
        <AccordionContent className="text-md font-light">
          1. Encienda su NodeMCU. <br />
          2. Busque la red Wi-Fi en su dispositivo. <br />
          <li className="ml-8">Red SSID: Sams</li>
          <li className="ml-8">Contraseña: 12345678</li>
          3. Conéctese a la red Wi-Fi de su NodeMCU.{" "}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="font-medium" value="item-2">
        <AccordionTrigger className="font-semibold text-lg">
          2. Configuración de Red
        </AccordionTrigger>
        <AccordionContent className="text-md font-light">
          1. Abra su navegador web y vaya a la dirección: http://192.168.4.1/{" "}
          <br />
          2. En la página web del NodeMCU, complete los campos para el SSID y la
          contraseña de su red Wi-Fi doméstica. <br />
          3. Haga clic en "Conectar" para establecer la conexión Wi-Fi. 4. Si
          todo sale bien verá una pantalla con un mensaje de exito.
          <br />
          5. Al volver de nuevo al inicio usted podrá obtener el id de su
          dispositivo, necesitará éste luego, aunque podrá volver a verlo de
          nuevo accediendo a la red de su NodeMCU.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="font-medium" value="item-3">
        <AccordionTrigger className="font-semibold text-lg">
          3. Acceso al Panel de Monitoreo
        </AccordionTrigger>
        <AccordionContent className="text-md font-light">
          1. Desconectese de la red de su NodeMCU
          <br />
          2. Ingrese a la pagina oficial de SAMS. <br />
          3. Inicie sesión con su cuenta, si aún no posee una podrá registrarse
          facilmente utilizando su correo electrónico.
          <br />
          4. Cuando ingrese al dashboard se encontrará con un mensaje de
          bienvenida y verá la opción de crear el aula, dentro se le pedirá que
          asigne un nombre con el id que se generó previamente.<br />
          5. Listo! Ya puede iniciar a monitorear el dispositivo y disfrutar de todas las características de SAMS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
)

export default InstructionsPage

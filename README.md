# INF236-2023-2-PAR201-GRUPO-04

# Grupo 4

Este es el repositorio del *Grupo 4*, cuyos integrantes son:

* Juan Daniel Alegría Vásquez - 202023510-4
* Juan Daniel Cucurella Mora - 202173608-5
* Javier Vicente Riquelme Toro - 202173551-8
* **Tutor**: Tabata Ahumada 

NOTA: ACTUALIZACIÓN DE INTEGRANTES PARA INGENIERÍA DE SOFTWARE 2024-1

* Juan Daniel Alegría Vásquez, 202023510-4
* Juan Daniel Cucurella Mora, 202173608-5
* Pablo Antonio Retamales Jara, 202173650-6
* Nicolas Mauricio Vergara Ayca - 2021305308-6

Para mayor información, visitar "retrospectiva" en la wiki del proyecto

## Descripción del problema original

Citando lo mencionado en Análisis y diseño de software, el problema consiste en "un hospital público de Santiago, 
específicamente en el área de imagenología, se lleva el registro de horas para la toma de exámenes 
de manera manual, en cuadernos que representan los meses del año. Estos cuadernos se subdividen en los días del mes, 
por lo que en las hojas definidas se anotan las horas, indicando los siguientes datos: nombre y RUT del paciente, 
examen que se realizará, nombre del médico que lo derivó, motivo por el cual se realiza el examen, fecha y hora del examen.
Esta modalidad ha llevado a problemas administrativos por parte del personal administrativo que gestiona las 
horas, quienes arbitrariamente han modificado las horas según su criterio, sobrescribiendo horas que estaban dadas con anterioridad. 
Por otra parte, muchas veces hay errores de datos de pacientes, exámenes y médicos, provocando correcciones sobre el papel. 
El orden de la información no se puede mantener, debido a la naturaleza estática de la escritura sobre los cuadernos. La 
letra de las personas que escriben no siembre es legible. Cada tipo de examen tiene distintos tiempos 
asignados, además de que se debe tener en consideración el horario de trabajo del personal de salud, cuya 
primera atención sería a las 08:30 y la última a las 12:30. Luego, por la tarde, desde las 14:30 hasta las 
16:00. Existe más de una persona con el equipo adecuado para tomar el mismo examen al mismo tiempo a 
distintos pacientes."

## Descripción del proyecto

Se propuso como solución un sistema para el fijado de horas para imagenología, montado sobre el stack MERN (Mongo, Express, React, Node Js), el cual permite usar una cuenta para
ingresar a un calendario para la visualización de horas, con un menú para modificar o agregar horas según necesidad por bloque de horario, es importante mencionar que para crear una
cuenta, debe hacerse consultando a la API directamente, la cual tiene los métodos necesarios para manejar la creación de cuentas y el ingreso de usuarios.

Nota: el proyecto en sí no se encuentra terminado(dadas las limitaciones de tiempo del semestre 2023-2 y el corto tiempo de desarrollo),
pero funciona como acercamiento a la idea propuesta y como primera versión para entender el funcionamiento del sistema, con el objetivo de 
escalar y mejorar las funcionalidades.

## Wiki

> Obtener enlace desde el home de la wiki del repo.

Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/Tabby2109/INF236-2023-2-PAR201-GRUPO-04/wiki)

## Videos

> Reemplazar con los enlaces correspondientes

* [Video presentación avance 1](https://www.youtube.com/watch?v=wlA6KKqgYtM&ab_channel=JavierRiquemet)
* Etc ...

## Aspectos técnicos relevantes

_Todo aspecto relevante cuando para poder usar el proyecto o consideraciones del proyecto base a ser entregado_

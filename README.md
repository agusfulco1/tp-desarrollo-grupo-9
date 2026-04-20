# TP Desarrollo de Software - Grupo 9

## GitHub Flow definido

Para la realización de este proyecto, decidimos implementar el flujo de trabajo **GitHub Flow**, el cual consiste en lo siguiente:

### main

El proyecto se encuentra en una **rama principal** `main` que se mantiene siempre estable y lista para producción.

### Ramas temporales

Cada modificación del proyecto se realiza en una **rama temporal**, por lo cual `main` se mantiene estable durante el desarrollo de cambios. 

  Dentro del **IDE** (**Entorno de Desarrollo Integrado**), para crear una rama utilizamos el siguiente comando de Git en la terminal:
```
  git checkout -b cambio
```
 
Una vez que tengamos los cambios desarrollados en el IDE, los agregamos a la rama con este comando:
```
  git add .
```
O los archivos modificados correspondientes:
```
  git add README.md
```
 
Luego, indicamos las modificaciones realizadas en dicha rama de forma clara:
```
  git commit -m "Modifico README.md"
```
 
Entonces pusheamos la rama en el repositorio:
```
  git push origin cambio
```
### Pull Request

Luego de hacer push, se abre un **Pull Request** (**PR**) en GitHub, el cual permite que se realicen las revisiones y pruebas necesarias por parte del equipo de desarrollo antes de agregar las modificaciones al `main`. En caso de que ocurra un fallo, se corrige en la misma rama.

Una vez aprobada la modificación por el equipo, el Pull Request se **mergea** en `main` desde GitHub, implementando los cambios en la rama principal.

Como alternativa, podemos realizar el mismo procedimiento desde la terminal del IDE:
```
  git checkout main
  git merge cambio
```
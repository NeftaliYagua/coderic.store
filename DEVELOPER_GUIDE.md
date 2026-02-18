# ????? Gu?a del Desarrollador - Coderic Fintech

## ?? Inicio R?pido

### Requisitos Previos
```bash
ruby >= 2.7.0
bundler >= 2.0.0
jekyll >= 3.9.0
```

### Instalaci?n
```bash
# Clonar el repositorio
git clone https://github.com/Coderic/coderic.co.git
cd coderic.co

# Instalar dependencias
bundle install

# Ejecutar servidor de desarrollo
bundle exec jekyll serve

# Abrir en navegador
open http://localhost:4000
```

---

## ?? Estructura del Proyecto

```
/workspace/
??? _config.yml              # Configuraci?n Jekyll
??? _data/
?   ??? services.yml         # ? Datos de servicios (EDITAR AQU?)
??? _includes/
?   ??? portal.html          # Navegaci?n principal
?   ??? service-hero.html    # Componente hero de servicios
?   ??? service-section.html # Componente secci?n de servicio
??? _sass/
?   ??? main.scss           # Estilos principales
??? assets/
?   ??? css/
?       ??? main.scss       # Entry point de estilos
??? images/                 # Recursos visuales
??? js/
?   ??? auth.js            # Autenticaci?n Auth0
??? *.html                 # P?ginas del sitio
??? CNAME                  # Configuraci?n dominio
```

---

## ??? C?mo Agregar un Nuevo Servicio

### Paso 1: Agregar datos del servicio en `_data/services.yml`

```yaml
- id: nuevo-servicio
  title: "T?TULO DEL SERVICIO"
  subtitle: "Subt?tulo corto"
  hero_title: "T?tulo principal del hero."
  hero_description: "Descripci?n breve del servicio."
  hero_image: "/images/hero-imagen.svg"
  icon: '<svg>...tu icono SVG...</svg>'
  sections:
    - title: "Secci?n 1"
      description: "Descripci?n de la secci?n 1."
      image_id: 1
      image_position: right
    - title: "Secci?n 2"
      description: "Descripci?n de la secci?n 2."
      image_id: 2
      image_position: left
```

### Paso 2: Crear archivo HTML del servicio

```html
---
layout: layout_en
navigation: portal.html
title: T?TULO DEL SERVICIO
---
{% assign service = site.data.services | where: "id", "nuevo-servicio" | first %}

{% include service-hero.html 
  icon=service.icon 
  subtitle=service.subtitle 
  hero_title=service.hero_title 
  hero_description=service.hero_description 
  hero_image=service.hero_image 
%}

<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            {% for section in service.sections %}
                {% include service-section.html 
                  title=section.title 
                  description=section.description 
                  image_id=section.image_id 
                  image_position=section.image_position 
                %}
            {% endfor %}
        </div>
    </div>
</div>
```

### Paso 3: Actualizar navegaci?n en `_includes/portal.html`

```html
<li class="static">
  <a class="flex items-end h-24 pb-6 font-semibold text-white transition duration-200 ease-in-out hover:bg-neutral-600 focus:bg-neutral-600 lg:px-6 {% if page.url contains '/nuevo-servicio' %}bg-orange-500{% else %}bg-stone-800{% endif %}"
    href="/nuevo-servicio">
    T?TULO DEL SERVICIO
  </a>
</li>
```

### Paso 4: Agregar tarjeta en `index.html`

```html
<a href="/nuevo-servicio" class="card h-64 px-4 pt-8 rounded-lg shadow-md">
    <div class="boxie">
        <div class="icon mb-4">
            <!-- Tu icono SVG aqu? -->
        </div>
        <h3 class="text-lg font-semibold text-center mb-2">T?TULO DEL SERVICIO</h3>
        <p class="text-center">Descripci?n breve del servicio.</p>
    </div>
</a>
```

---

## ?? Personalizaci?n de Estilos

### Variables de Color
Ubicaci?n: `_sass/main.scss`

```scss
$backgroundColor: #ffffff;
$bodyColor: #000000;
$bodyFont: -apple-system, BlinkMacSystemFont, "Segoe UI", ...;
```

### Clases TailwindCSS Disponibles
El sitio utiliza TailwindCSS con las siguientes clases principales:

- **Layout:** `flex`, `grid`, `container`, `max-w-7xl`
- **Colores:** `bg-stone-800`, `text-orange-500`, `bg-orange-600`
- **Espaciado:** `px-20`, `py-14`, `mb-4`, `gap-4`
- **Efectos:** `hover:bg-orange-500`, `shadow-xl`, `rounded-lg`

---

## ?? Configuraci?n de Autenticaci?n

### Auth0 (`js/auth.js`)

```javascript
var webAuth = new auth0.WebAuth({
  clientID: 'YOUR_CLIENT_ID',
  domain: 'auth.coderic.org',
  audience: 'https://coderic.eu.auth0.com/userinfo',
  scope: 'openid profile email',
  redirectUri: 'https://coderic.co/callback',
  responseType: 'token id_token'
});
```

### P?ginas de Auth
- `/callback.html` - Redirecci?n despu?s del login
- `/logout.html` - P?gina de logout

---

## ?? Componentes Reutilizables

### service-hero.html
Par?metros requeridos:
- `icon` - C?digo SVG del icono
- `subtitle` - Subt?tulo del hero
- `hero_title` - T?tulo principal
- `hero_description` - Descripci?n
- `hero_image` - Ruta de la imagen

Ejemplo de uso:
```liquid
{% include service-hero.html 
  icon=service.icon 
  subtitle=service.subtitle 
  hero_title=service.hero_title 
  hero_description=service.hero_description 
  hero_image=service.hero_image 
%}
```

### service-section.html
Par?metros requeridos:
- `title` - T?tulo de la secci?n
- `description` - Descripci?n de la secci?n
- `image_id` - ID de la imagen (1-6 para Picsum)
- `image_position` - `left` o `right`

Ejemplo de uso:
```liquid
{% include service-section.html 
  title="Mi Secci?n" 
  description="Descripci?n aqu?" 
  image_id=1 
  image_position="right" 
%}
```

---

## ?? Datos Estructurados (`_data/services.yml`)

### Estructura del Archivo

```yaml
- id: string              # Identificador ?nico (slug)
  title: string           # T?tulo en may?sculas
  subtitle: string        # Subt?tulo corto
  hero_title: string      # T?tulo principal del hero
  hero_description: string # Descripci?n del hero
  hero_image: string      # Ruta de la imagen hero
  icon: string           # C?digo SVG inline
  sections:              # Array de secciones
    - title: string      # T?tulo de la secci?n
      description: string # Descripci?n de la secci?n
      image_id: number   # ID de imagen (1-6)
      image_position: string # "left" o "right"
```

### Acceso en Liquid

```liquid
{% assign service = site.data.services | where: "id", "service-id" | first %}
{{ service.title }}
{{ service.hero_description }}

{% for section in service.sections %}
  {{ section.title }}
{% endfor %}
```

---

## ?? Testing y Validaci?n

### Validar HTML
```bash
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external
```

### Verificar Enlaces Rotos
```bash
bundle exec jekyll build --trace
```

### Validar Sintaxis Liquid
```bash
bundle exec jekyll build --strict_front_matter
```

---

## ?? Deployment

### GitHub Pages (Autom?tico)
```bash
git push origin main
# GitHub Pages despliega autom?ticamente
```

### Manual Build
```bash
bundle exec jekyll build
# Los archivos est?n en _site/
```

### Netlify
```toml
[build]
  command = "bundle exec jekyll build"
  publish = "_site"
```

---

## ?? Troubleshooting

### Problema: Estilos no se cargan
**Soluci?n:** Verificar que `assets/css/main.scss` existe y tiene:
```scss
---
---
@import "main";
```

### Problema: Componentes no se renderizan
**Soluci?n:** Verificar que los archivos est?n en `_includes/` y sin extensi?n `.html` en el include:
```liquid
{% include service-hero.html %}  ?
{% include service-hero %}        ?
```

### Problema: Datos no aparecen
**Soluci?n:** Verificar que `_data/services.yml` tiene sintaxis YAML v?lida:
```bash
# Validar YAML
ruby -e "require 'yaml'; YAML.load_file('_data/services.yml')"
```

---

## ?? Recursos ?tiles

### Documentaci?n
- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Liquid Templating](https://shopify.github.io/liquid/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Auth0 Docs](https://auth0.com/docs)

### Jekyll Cheat Sheet
```liquid
# Variables
{{ variable }}

# Condicionales
{% if condition %}...{% endif %}

# Loops
{% for item in array %}...{% endfor %}

# Filters
{{ "texto" | upcase }}
{{ array | where: "key", "value" }}
{{ array | first }}
```

---

## ?? Contribuciones

### Flujo de Trabajo
1. Crear una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commits descriptivos: `git commit -m "feat: agregar nuevo servicio"`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Crear Pull Request en GitHub

### Convenciones de Commits
- `feat:` Nueva funcionalidad
- `fix:` Correcci?n de bug
- `docs:` Documentaci?n
- `style:` Cambios de estilo
- `refactor:` Refactorizaci?n
- `test:` Tests
- `chore:` Tareas de mantenimiento

---

## ?? Soporte

**Email:** dev@coderic.co  
**Documentaci?n:** [docs.coderic.co](https://docs.coderic.co)  
**Issues:** [GitHub Issues](https://github.com/Coderic/coderic.co/issues)

---

**?ltima actualizaci?n:** 2025-11-02  
**Mantenedor:** Equipo de Desarrollo Coderic

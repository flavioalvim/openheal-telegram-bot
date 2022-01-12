*Lista de telefones*

{{#specialties}}
*{{specialty}}*

{{#professionals}}
{{^hasMultiplePhones}}
{{#telephones}}
{{name}} - {{telephone}}
{{/telephones}}
{{/hasMultiplePhones}}{{#hasMultiplePhones}}
{{name}}
{{#telephones}}
    {{telephone}}
{{/telephones}}
{{/hasMultiplePhones}}

{{/professionals}}
{{/specialties}}

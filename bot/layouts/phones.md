{{#specialties}}
*Lista de Telefones - {{specialty}}*

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

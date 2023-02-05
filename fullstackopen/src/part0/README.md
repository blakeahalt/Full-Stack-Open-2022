# [Part 0 - Fundamentals of Web apps](https://fullstackopen.com/en/part0)

In this part, we will familiarize ourselves with the practicalities of taking the course. After that we will have an overview of the basics of web development, and also talk about the advances in web application development during the last few decades.

a. [General info](https://fullstackopen.com/en/part0/general_info)  
b. [Fundamental of Web apps](https://fullstackopen.com/en/part0/fundamentals_of_web_apps)


0.4: New Note ['/new_note'](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bm90ZSBvdmVyIGJyb3dzZXI6ClVzZXIgZW50ZXJzIHRleHQgYW5kIGNsaWNrcyAnU2F2ZScKZW5kIG5vdGUKAC4HLT5zZXJ2ZXI6IEhUVFAgUE9TVCBodHRwczovL3N0dWRpZXMuY3MuaGVsc2lua2kuZmkvZXhhbXBsZWFwcC9uZXdfAEkFAIEDCgBIBwoAUQYgcmVzcG9uZHMgd2l0aCBTdGF0dXMgQ29kZSAzMDI6IGEgVVJMIHJlZGlyZWN0IHRvICIvbm90ZXMiCgBbK290ZXMAgVAKAIFLBi0tPgCCEAgAgVUGcwB2BmMAdQcAgSgLAII3CXJlbG9hZGluZwB9CSBjYXVzZXMgMwCCGQZyZXF1ZXN0cyBmZXRjaGluZzoKbWFpbi5jc3MsIAAFBWpzLCBkYXRhLmpzb24Agk4gR0UAgkEsAGIIAIFOEwASCQAfSWoAThlqcwoAgigUAIR-ByBzdGFydHMgZXhlY3V0aW5nIGpzLWNvZGUKdGhhdACCNwpKU09OAIIkBSBmcm9tAIQvByAAhRUKAIFtRQCCfwoAhAISYXBwLnBvc3QoLi4uAIRtBS5wdXNoKHtjb250ZW50Oi4uLmRhdGU6Li4ufSkgcmV0dXJuIHJlcy4AhSUIKCcAhSQGJykAgXsVAIV5B2FjY2Vzc2VzIGZvcm0AgWYLJwCGMwknIGFuZApwdXNoZXMgaQCFfwUAUgggYXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgKACBHwcsZGF0ZSkgCmJ5IGFwcGVuAIU3BQA-BnRoZQCHZAVzIGFycmF5AIJPCwo&s=default)

  note over browser:
  User enters text and clicks 'Save'
  end note
  browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
  note over server:
  server responds with Status Code 302: a URL redirect to "/notes"
  https://studies.cs.helsinki.fi/exampleapp/notes
  end note
  server-->browser: HTTP status code 302
  note over browser:
  reloading "/notes" causes 3 HTTP requests fetching:
  main.css, main.js, data.json
  end note
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
  server-->browser: main.css
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
  server-->browser: main.js

  note over browser:
  browser starts executing js-code
  that requests JSON data from server 
  end note

  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
  server-->browser: app.post(...notes.push({content:...date:...}) return res.redirect('/notes')

  note over browser:
  server accesses form data from '/new_note' and
  pushes it to '/notes' as an object containing (content,date) 
  by appending it to the notes array
  end note

0.5: Single page app ['/spa'](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bm90ZSBvdmVyIGJyb3dzZXI6ClVzZXIgYXJyaXZlcyB0byBodHRwczovL3N0dWRpZXMuY3MuaGVsc2lua2kuZmkvZXhhbXBsZWFwcC9zcGEKZW5kIG5vdGUKAEkHLT5zZXJ2ZXI6IEhUVFAgR0VUACIvADkGLS0-AIEZCCBIVE1MLWNvZAAeRm1haW4uY3NzAFYTABIJAIEFRy5qAFIUABIHCgCCeBMALgYgdGVsbHMgAIJCBiB0aGF0IHRoZSBmb3JtIGRhdGEgaXMgSlNPTi1kYXRhOgonQ29udGVudC10eXBlOiBhcHBsaWNhdGlvbi9qc29uJwCCVU5kYXRhLmpzb24AgTUMAINsBwCDNQcgZmV0Y2hlcyBlbGVtZW50IHdpdGggJ2RvY3VtZW50LmdldEUAFAZCeUlkKCdub3Rlc19mb3JtJyknIGFuZApwcmV2ZW50cwCBaQZmcm9tIHJlYWNoaW5nAIIGBQCCFAcAUgZlLgAoB0RlZmF1bHQoKQCBaAsAgRISdGhlIABZBSBoYW5kbGVyIGNyZWF0ZXMgYSBuZXcAhUgFIGFuZCBhZGRzIGl0IHRvAIJ6BQCBIQUgbGlzAIFICACBMgUucHVzaChub3RlAGoMAIUyE1t7IGMAgyIGOiAiLi4uIiwgZGF0ZQAGByB9LCAuLi5dAIQBFQCHIwcgZXhlY3V0ZXMAhAkFAIE2DQoAhCAFcmVuZGVycwCBIwd0byBkaXNwbGF5AIENCwoKCgo&s=default)

  note over browser:
  User arrives to https://studies.cs.helsinki.fi/exampleapp/spa
  end note
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
  server-->browser: HTML-code
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
  server-->browser: main.css
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  server-->browser: spa.js

  note over browser:
  spa.js tells server that the form data is JSON-data:
  'Content-type: application/json'
  end note
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

  note over server:
  server fetches element with 'document.getElementById('notes_form')' and
  prevents data from reaching the server with 'e.preventDefault()'
  end note
  note over server:
  the event handler creates a new note and adds it to the notes list with 'notes.push(note)'
  end note

  server-->browser: [{ content: "...", date: "..." }, ...]

  note over browser:
  browser executes the event handler
  that renders notes to display
  end note

0.6: New Note ['/new_note_spa'](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bm90ZSBvdmVyIGJyb3dzZXI6ClVzZXIgYXJyaXZlcyB0byBodHRwczovL3N0dWRpZXMuY3MuaGVsc2lua2kuZmkvZXhhbXBsZWFwcC9zcGEKZW5kIG5vdGUKAEkHLT5zZXJ2ZXI6IEhUVFAgR0VUACIvADkGLS0-AIEZCCBIVE1MLWNvZAAeRm1haW4uY3NzAFYTABIJAIEFRy5qAFIUABIHCgCCeBMALgYgdGVsbHMgAIJCBiB0aGF0IHRoZSBmb3JtIGRhdGEgaXMgSlNPTi1kYXRhOgonQ29udGVudC10eXBlOiBhcHBsaWNhdGlvbi9qc29uJwCCVU5kYXRhLmpzb24AgTUMAINsBwCDNQcgZmV0Y2hlcyBlbGVtZW50IHdpdGggJ2RvY3VtZW50LmdldEUAFAZCeUlkKCdub3Rlc19mb3JtJyknIGFuZApwcmV2ZW50cwCBaQZmcm9tIHJlYWNoaW5nAIIGBQCCFAcAUgZlLgAoB0RlZmF1bHQoKQCBaAsAgRISdGhlIABZBSBoYW5kbGVyIGNyZWF0ZXMgYSBuZXcAhUgFIGFuZCBhZGRzIGl0IHRvAIJ6BQCBIQUgbGlzAIFICACBMgUucHVzaChub3RlAGoMAIUyE1t7IGMAgyIGOiAiLi4uIiwgZGF0ZQAGByB9LCAuLi5dAIQBFQCHIwcgZXhlY3V0ZXMAhAkFAIE2DQoAhCAFcmVuZGVycwCBIwd0byBkaXNwbGF5AIENCwCHZxhlbnRlcnMgdGV4dACBdwVjbGlja3MgJ1N1Ym1pdACBTgwAh1EWUE9TAIc8LG5ld19ub3RlX3NwYQCENBQASgpyZXF1ZXMAgwAFJwAqDScAgkoFYWlucyB1c2VyIGlucHV0IGFzIGEAhhYGc3RyaW5nLgCCdx0AiR0FU3RhdHVzIENvZGUgMjAxAIcCFgCHBQZyZXNwb25kcwCFSwYAKg86IApBbgCEShBvbnZlcnQAgywGSlNPTgCHOQdudG8AhGIMCmFuZCB0aGVuIHB1c2hlAIRqDACKRwYAgTsM&s=default)

  note over browser:
  User arrives to https://studies.cs.helsinki.fi/exampleapp/spa
  end note
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
  server-->browser: HTML-code
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
  server-->browser: main.css
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  server-->browser: spa.js

  note over browser:
  spa.js tells server that the form data is JSON-data:
  'Content-type: application/json'
  end note
  browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

  note over server:
  server fetches element with 'document.getElementById('notes_form')' and
  prevents data from reaching the server with 'e.preventDefault()'
  end note
  note over server:
  the event handler creates a new note and adds it to the notes list with 'notes.push(note)'
  end note

  server-->browser: [{ content: "...", date: "..." }, ...]

  note over browser:
  browser executes the event handler
  that renders notes to display
  end note

  note over browser:
  User enters text and clicks 'Submit'
  end note

  browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

  note over server:
  HTTP POST request to '/new_note_spa' contains user input as a JSON-string.
  end note

  server-->browser: HTTP Status Code 201

  note over browser:
  server responds with Status Code 201: 
  An event handler converts the JSON data into a new note 
  and then pushes it to the server.
  end note

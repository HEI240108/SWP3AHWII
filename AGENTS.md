# AGENTS.md — 3AHWII SWP Konfiguration & Kriterien

**Schüler:** Jonas  
**Klasse:** 3AHWII (WII - Betriebsinformatik, HTL Spengergasse)  
**Lehrperson:** Prof. Georg Graf

---

## Zweck dieser Datei
Steuert das Verhalten von Agenten in diesem Repository zur Einhaltung der Bewertungsstandards von Prof. Graf:
1. **Laufzeitumgebung & TDD:** Deno (TypeScript). Jede Klasse und Methode wird testgetrieben entwickelt (`deno test`).
2. **Kapselung & Fail-Fast:** Invarianten werden im Konstruktor und mutierenden Methoden per `throw new Error(...)` gesichert; Felder sind `private` oder `readonly`.
3. **Verträge vor Vererbung:** Eigene Interfaces mit 2 verschiedenen Implementierungen und polymorphen Hilfsfunktionen; Structural Typing schriftlich begründen.
4. **Schriftliche Vorhersagen:** Fragen zu Referenzsemantik (`c = a`) und Compile-Time vs. Runtime vorab beantworten.
5. **Git-Disziplin:** Aufgaben in kleine, atomare Commits aufteilen (z. B. Starter/Test -> Implementierung -> Doku), keine Sammel-Commits, sprechende Conventional Commit Messages.

# Readar
A writing tool developed for technical writers.

### Current Design Pattern
Readar is currently a set of unorganized functions that hoist in the right order. The next implementation will be organized as a set of methods that are grouped with their own internal "global" and local properties. These objects will "communicate" with one another to make Readar work.

![Readar Logo](media/ReadarLogo2.svg)
Format: ![Readar](kenyanburnham.github.io/Readar)

### Current Work
- Interpreter(object) that handles internal representation of non-standard words.
- Analyzer(object) that handles the numerical representation (with a custom set of methods for Decoupler(object))
- Packager(object) that packages data into a JSON dataset for later server-side use.

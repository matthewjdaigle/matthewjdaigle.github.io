---
layout: home
permalink: /software/
title: Software
---

## NASA Open Source Software Projects

### Generic Software Architecture for Prognostics (GSAP)

The [Generic Software Architecture for Prognostics](https://github.com/nasa/GSAP/) (GSAP) is a generic, extendable, flexible, modular C++ framework for applying prognostics technologies. GSAP manages top-level control, communications, logging, configuration, integration, and other general activities. A simple, standard interface is provided for integrating prognostics algorithms and models, minimizing the work required to deploy prognostics technologies. The standard interface allows for prognosers developed for GSAP to be reused anywhere GSAP is used.  

### Prognostics Model Library

The [Prognostics Model Library](https://github.com/nasa/PrognosticsModelLibrary/) is a modeling framework focused on defining and building models for prognostics (computation of remaining useful life) of engineering systems, and provides a set of prognostics models for select components developed within this framework, suitable for use in prognostics applications for these components. The library currently includes models for valves, pumps, and batteries. The Prognostics Model Library is implemented in MATLAB. The implementation consists of a set of utilities for defining a model (specifying variables, parameters, and equations), simulating the model, and embedding it within common model-based prognostics algorithms. A user can use existing models within the library or construct new models with the provided framework.

### Prognostics Algorithm Library

The [Prognostics Algorithm Library](https://github.com/nasa/PrognosticsAlgorithmLibrary/) is a suite of algorithms implemented in the MATLAB programming language for model-based prognostics (remaining life computation). It includes algorithms for state estimation and prediction, including uncertainty propagation. The algorithms take as inputs component models developed in Matlab, and perform estimation and prediction functions. The library allows the rapid development of prognostics solutions for given models of components and systems. Different algorithms can be easily swapped to do comparative studies and evaluations of different algorithms to select the best for the application at hand.

### Prognostics Metrics Library

The [Prognostics Metrics Library](https://github.com/nasa/PrognosticsMetricsLibrary/) is a suite of performance metrics implemented in the MATLAB programming language for prognostics (remaining life computation). Through a common set of performance metrics, prognostics
algorithms may be compared within a consistent framework.

### Virtual ADAPT

[VirtualADAPT](https://github.com/nasa/VirtualADAPT/) is a high-fidelity, Matlab Simulink-based simulation testbed that emulates the Advanced Diagnostics and Prognostics Testbed (ADAPT) hardware for running offline health management experiments. This simulation testbed models all components of the ADAPT hardware within the power storage and power distribution subsystems. The physical components of the testbed, i.e., the batteries, relays, and the loads, are replaced by simulation modules that generate the same dynamic behaviors as the hardware testbed.

### LH2Sim

[LH2Sim](https://github.com/nasa/LH2Sim/) is a Matlab simulation of cryogenic (liquid hydrogen) tanks incorporating temperature stratification effects.

## Personal Projects

### BibX

[BibX](https://github.com/matthewjdaigle/BibX) is a personal bibliography management tool. The file format is XML-based, and exporting to other formats (BibTeX, HTML, YAML, etc.) are provided through custom XSL transformations. The app is cross-platform and is built with [Electron](https://electron.atom.io/).

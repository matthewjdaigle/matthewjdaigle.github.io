---
layout: home
permalink: /software/
---

## Open-Source Software
- <a href="https://github.com/nasa/GSAP/">Generic Software Architecture for Prognostics (GSAP)</a>: The Generic Software Architecture for Prognostics (GSAP) is a generic, extendable, flexible, modular C++ framework for applying prognostics technologies. GSAP manages top-level control, communications, logging, configuration, integration, and other general activities. A simple, standard interface is provided for integrating prognostics algorithms and models, minimizing the work required to deploy prognostics technologies. The standard interface allows for prognosers developed for GSAP to be reused anywhere GSAP is used.
- <a href="https://github.com/nasa/PrognosticsModelLibrary/">Prognostics Model Library</a>: The Prognostics Model Library is a modeling framework focused on defining and building models for prognostics (computation of remaining useful life) of engineering systems, and provides a set of prognostics models for select components developed within this framework, suitable for use in prognostics applications for these components. The library currently includes models for valves, pumps, and batteries. The Prognostics Model Library is implemented in MATLAB. The implementation consists of a set of utilities for defining a model (specifying variables, parameters, and equations), simulating the model, and embedding it within common model-based prognostics algorithms. A user can use existing models within the library or construct new models with the provided framework.
- <a href="https://github.com/nasa/PrognosticsAlgorithmLibrary/">Prognostics Algorithm Library</a>: The Prognostics Algorithm Library is a suite of algorithms implemented in the MATLAB programming language for model-based prognostics (remaining life computation). It includes algorithms for state estimation and prediction, including uncertainty propagation. The algorithms take as inputs component models developed in Matlab, and perform estimation and prediction functions. The library allows the rapid development of prognostics solutions for given models of components and systems. Different algorithms can be easily swapped to do comparative studies and evaluations of different algorithms to select the best for the application at hand.
- <a href="https://github.com/nasa/VirtualADAPT/">Virtual ADAPT</a>:
VirtualADAPT is a high-fidelity, Matlab Simulink-based simulation testbed that emulates the Advanced Diagnostics and Prognostics Testbed (ADAPT) hardware for running offline health management experiments. This simulation testbed models all components of the ADAPT hardware within the power storage and power distribution subsystems. The physical components of the testbed, i.e., the batteries, relays, and the loads, are replaced by simulation modules that generate the same dynamic behaviors as the hardware testbed.
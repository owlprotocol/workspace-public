---
sidebar_position: 1
slug: '/advanced'
---

# Overview

### Deployment

TODO

### Architecture

We use a somewhat complicated system of interlaced proxies in order to optimize for low-gas deployments and easily-upgradeable contracts. This comes at the cost of a small uptick in gas used per transaction.

See [OWLArchitecture](https://github.com/owlprotocol/contracts/blob/master/OWLArchitecture.svg) for more info on what's going on under the hood.

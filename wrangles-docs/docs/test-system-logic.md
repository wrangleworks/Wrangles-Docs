---
title: System Logic Test
description: Documentation for the core processing logic
---

# Core Processing Logic

This page documents the critical `process_data` function used in our backend.

## How it works

The system takes a list of numbers and applies the following transformation:
1. It filters out any negative numbers.
2. It multiplies the remaining numbers by **2**.
3. It returns the sum of these new numbers.

### Example

Input: `[1, 2, 3]`
Output: `12` (because 1*2 + 2*2 + 3*2 = 12)

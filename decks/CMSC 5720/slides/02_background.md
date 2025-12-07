### Background: The Memory Wall

<div class="text-left">

* **The Bottleneck:** LLM Inference is memory-bound.
* **Auto-regressive:** $x_t = \text{Model}(x_1, ..., x_{t-1})$
* **Low Arithmetic Intensity:** Loading entire weights $\rightarrow$ Calculating 1 token.
* **Consequence:** GPU Compute units sit idle.

</div>

<div class="highlight-box fragment">
<strong>Insight:</strong> Trade surplus compute power for reduced memory access.
</div>


--

### The Solution: Speculative Decoding

<!-- <div class="two-col"> -->
<div class="col">

**Draft-then-Verify Paradigm**

1.  <span style="color: #007bff;">Draft:</span> Small model ($\mathcal{M}_p$) guesses $K$ tokens.
2.  <span style="color: #d63384;">Verify:</span> Target model ($\mathcal{M}_q$) checks all $K$ in **one pass**.

</div>
<!-- <div class="col"> -->

<!-- > Specific Approach: **EAGLE** > (Extrapolation Algorithm for Greater Language-model Efficiency) -->

<!-- </div> -->
</div>

--

### Motivation: Why Nano-vLLM?

* **vLLM (C++):** High barrier for rapid prototyping.
* **Nano-vLLM (Python):**
    * ~1,200 lines of pure Python.
    * Reproduces **PagedAttention**.
    * **Transparent:** Focus on Scheduler/Memory logic, not compilation.

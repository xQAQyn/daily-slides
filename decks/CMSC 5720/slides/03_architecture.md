### System Architecture Workflow

**Transforming into a 3-Stage Pipeline:**

1.  **Stage 1: The Drafting Loop** <br><span class="small-text">Generate $K$ candidate tokens + Allocate temp blocks.</span>
2.  **Stage 2: Verification Step** <br><span class="small-text">Parallel forward pass on sequence length $N+K+1$.</span>
3.  **Stage 3: Acceptance & Rollback** <br><span class="small-text">Accept $n$ tokens; Truncate $K-n$ invalid tokens.</span>


--

### Challenge 1: KV Cache Management

<div class="text-left">

**Problem:** Rejected drafts leave "Dirty State" in GPU memory.

**Solution: Transactional Block Manager**

* Implemented `truncate(length)` mechanism.
* **Logical:** Remove mapping from Block Table.
* **Physical:** Mark blocks as free (No zeroing).

</div>

```python
# Concept: Transactional Rollback
def truncate(self, length):
    # 1. Identify physical blocks for rejected tokens
    # 2. Update block table mapping
    # 3. Mark blocks as free immediately
    pass 
```


--

### Challenge 2: The "Ragged Batch"


**Problem:** Divergent acceptance rates desynchronize the batch.

  * Breaks SIMT parallelism (Tensor Cores).

**Solution: Iteration-Level Scheduling**

  * **Synchronize:** Enforce uniform drafting steps.
  * **Realign:** CPU scheduler realigns pointers between iterations.
  * *Avoids complex custom CUDA kernels.*



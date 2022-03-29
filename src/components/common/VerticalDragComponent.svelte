<script lang="ts">
  let containerElement;
  const handleDocumentMouseMove = (event) => {
    event.preventDefault();
    containerElement.style[
      'grid-template-columns'
    ] = `clamp(230px, ${event.clientX}px, 80%) 10px 1fr`;
  };

  const handleDocumentMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const handleDraggableMouseDown = (event) => {
    event.preventDefault();
    document.onmouseup = handleDocumentMouseUp;
    document.onmousemove = handleDocumentMouseMove;
  };
</script>

<div class="root" bind:this={containerElement}>
  <slot name="left">
  </slot>
  <section class="draggable" on:mousedown={handleDraggableMouseDown}>
    <div />
  </section>
  <slot name="right">
  </slot>
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 10px 1fr;
    height: calc(100% - 2em);
    gap: 5px;
    padding: 5px;
  }
  
  .draggable {
    height: 100%;
    cursor: col-resize;
    box-sizing: border-box;
  }

  .draggable:hover {
    height: 100%;
    border: 3px solid var(--neutral-fill-input-hover);
    background-color: var(--accent-fill-hover);
  }

  .draggable > div {
    margin: 0 3px;
    height: 100%;
    background-color:  var(--accent-fill-rest);
  }
</style>
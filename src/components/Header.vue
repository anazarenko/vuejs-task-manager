<template>
  <div class="row">
    <nav class="blue-grey darken-1">
      <div class="nav-wrapper">
        <router-link to="/" activeClass="active"><a class="brand-logo">TODO Manager</a></router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link to="/create" activeClass="active" tag="li"><a>Create New Task</a></router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {}
</script>

<style></style>

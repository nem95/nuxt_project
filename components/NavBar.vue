<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <nuxt-link :to="{ name: 'index'}" class="nav-link">
            Home
          </nuxt-link>
        </li>
        <li class="nav-item active">
          <nuxt-link :to="{ name: 'housing'}" class="nav-link">
            Liste des appartements
          </nuxt-link>
        </li>
        <li class="nav-item active">
          <nuxt-link :to="{ name: 'booking'}" class="nav-link">
            Liste des réservations
          </nuxt-link>
        </li>
        <li class="nav-item active">
          <nuxt-link to="/housing/new" class="nav-link">
            Créer une annonce
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

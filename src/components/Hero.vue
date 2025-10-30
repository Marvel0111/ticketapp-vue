<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="decorative-circle circle-1" aria-hidden="true"></div>
    <div class="decorative-circle circle-2" aria-hidden="true"></div>

    <div class="hero-content">
      <h1 id="hero-title">TicketApp</h1>
      <p>Manage tickets easily across teams with real-time updates.</p>

      <div class="hero-cta">
        <router-link to="/auth/login" class="btn">Login</router-link>
        <router-link to="/auth/signup" class="btn btn-primary">Get Started</router-link>
      </div>
    </div>

    <img src="../assets/hero-wave.svg" alt="decorative wave" class="hero-wave" />
  </section>
</template>

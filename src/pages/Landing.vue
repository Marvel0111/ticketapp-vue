<template>
  <div>
    <Hero />

    <div class="container">
      <section class="landing-features">
        <h2>Features</h2>

        <div class="grid grid-3">
          <div class="card">
            <h3>Seamless Tracking</h3>
            <p>Track tickets from open to closed with status updates.</p>
          </div>

          <div class="card">
            <h3>Team Access</h3>
            <p>Collaborate with your team on any ticket.</p>
          </div>

          <div class="card">
            <h3>Real-time Updates</h3>
            <p>Get instant notifications for ticket changes.</p>
          </div>
        </div>
      </section>

      <section class="landing-cta">
        <div class="card" style="text-align: center; padding: 48px 24px; margin-top: 48px;">
          <h2>Ready to streamline your workflow?</h2>
          <p>Join teams using TicketApp to manage their tickets effectively.</p>
          <div class="cta-buttons" style="margin-top: 24px;">
            <router-link to="/auth/login" class="btn">Login</router-link>
            <router-link to="/auth/signup" class="btn btn-primary">Get Started Free</router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
</script>


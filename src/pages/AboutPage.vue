<template>
  <div class="container">
    <h1 class="title">About Page</h1>

    <div class="card-container">
      <div class="card-item">
        <b-card border-variant="success" header="About Us" header-bg-variant="success" header-text-variant="white" align="center" class="about-card">
          <b-card-text>
            Hello! We are Kathy Eva Agafonov and Netanel Krotovich.
            <br>
            Welcome to Grammy's Recipes Website.
            <br>
            <br>
            Grammy's Recipes Website is a carefully crafted online platform designed to offer a delightful culinary experience to its visitors. The website provides a vast collection of tried and true recipes, showcasing a diverse range of flavors and cuisines. Each recipe is meticulously written and presented with clear instructions and ingredients, making it easy for users to follow along.
            <br>
          </b-card-text>
        </b-card>
      </div>
    </div>

    <div class="card-container">
      <div class="card-item">
        <b-card border-variant="success" header="Dreams Invader - Rick VS. Scary Terry" header-bg-variant="success" header-text-variant="white" align="center" class="about-card">
          <b-card-text>
            Dreams Invader is an exciting website game inspired by Season 1, Episode 2 of the Rick and Morty series.
            <br>
            <br>
            In this game, you will join forces with Rick to rescue Morty, who has been trapped in his own dreams by the villainous Scary Terry. Your mission is to help Rick defeat Scary Terry and save Morty from his nightmarish ordeal.
          </b-card-text>
          <div class="card-link">
            <a href="https://github.com/Web-Development-Environments-2023/assignment2-206332348_311272413">Play Dreams Invader game</a>
          </div>
        </b-card>
      </div>

      <div class="card-item">
        <b-card border-variant="success" header="Our Website" header-bg-variant="success" header-text-variant="white" align="center" class="about-card">
          <b-card-text>
            In this exercise, we have designed a website specifically tailored for elderly individuals.
            <br>
            <br>
            We invite you to explore our website and discover the fascinating characters we have carefully selected to feature. By doing so, you will gain a deeper understanding of the unique individuals that form the foundation of our website.
          </b-card-text>
          <div class="card-link">
            <a href="https://github.com/Web-Development-Environments-2023/206332348" class="card-link">Kathy Eva Agafonov</a>
            <a href="https://github.com/Web-Development-Environments-2023/311272413" class="card-link">Netanel Krotovichv</a>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card-item {
  flex: 1;
}

.about-card {
  max-width: 40rem;
}

.card-link {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.card-link a {
  color: #42b983;
  text-decoration: none;
}

.card-link a:hover {
  text-decoration: underline;
}
</style>

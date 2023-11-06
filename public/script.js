const apiUrl = "/api/v1";
let token = "";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch(`${apiUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      token = data.token;
      showInputForm();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function showInputForm() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  try {
    const response = await fetch(`${apiUrl}/spots`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const spotsSelect = document.getElementById("spots");
      data.spots.forEach((spot) => {
        const option = document.createElement("option");
        option.value = spot.name;
        option.text = spot.name;
        spotsSelect.appendChild(option);
      });
      loader.style.display = "none";
      document.getElementById("login-form").classList.add("hidden");
      document.getElementById("input-form").classList.remove("hidden");
    } else {
      alert("Error fetching spots. Please try again.");
      loader.style.display = "none";
    }
  } catch (error) {
    console.error("Error:", error);
    loader.style.display = "none";
  }
}
async function calculate() {
  const spot = document.getElementById("spots").value;
  const cyclingSpeed = document.getElementById("cyclic-speed").value.trim();
  const dailyCyclingHours = document.getElementById("daily-hours").value.trim();

  if (cyclingSpeed === "" || dailyCyclingHours === "") {
    alert("Cycling Speed and Daily Cycling Hours are mandatory fields.");
    return;
  }

  let latitude, longitude;
  if ("geolocation" in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    } catch (error) {
      console.error("Error getting geolocation:", error);
      return;
    }
  } else {
    console.error("Geolocation is not supported by this browser.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        spot,
        cyclingSpeed,
        dailyCyclingHours,
        latitude,
        longitude,
      }),
    });
    if (response.status === 200) {
      const estimateResponse = await fetch(`${apiUrl}/estimate`, {
        headers: {
          Authorization: token,
        },
      });
      const estimateData = await estimateResponse.json();
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = `Estimated Time: ${estimateData.estimatedTime} hours`;
    } else {
      const errorResponse = await response.json();
      alert(
        errorResponse.message || "Error calculating time. Please try again."
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

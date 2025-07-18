const getProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
  };
  


export default {
  base_URI:
    process.env.NODE_ENV === "production"
      ? "http://diarycalendar.herokuapp.com"
      : "http://localhost:3000"
};
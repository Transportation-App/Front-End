import "../../styles/tempTicketScreen.css";

const Map = () => {
  return (
    <div className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d1580482.813689821!2d21.825563270270717!3d39.31363229525876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e0!4m5!1s0x14a838f41428e0ed%3A0x9bae715b8d574a9!2sThessaloniki!3m2!1d40.6400629!2d22.944419099999998!4m5!1s0x135f45553b3f43f1%3A0x5344ba71e6c6fec7!2zzpvOsc68zq_OsQ!3m2!1d38.8997433!2d22.4337387!4m5!1s0x14a1bd1f067043f1%3A0x2736354576668ddd!2zzpHOuM6uzr3OsQ!3m2!1d37.9838096!2d23.727538799999998!5e0!3m2!1sel!2sgr!4v1727456770530!5m2!1sel!2sgr"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "0.575rem" }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;

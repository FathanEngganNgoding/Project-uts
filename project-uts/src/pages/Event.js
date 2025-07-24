import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../event.css";

const Event = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost/list.php")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((data) => {
        setBerita(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      className="event-section d-flex align-items-center"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/bg-event.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        paddingTop: "0px",
        paddingBottom: "40px",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 className="mb-4" style={{ color: "white", textAlign: "center" }}>
          Event & Berita
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <Slider {...settings}>
            {berita.map((item) => (
              <div key={item.id} className="event-card">
                <div className="event-image-wrapper">
                  <img
                    src={`http://localhost/${item.thumbnail}`}
                    alt={item.title}
                    className="event-image"
                  />
                </div>
                <div className="event-title">{item.title}</div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Event;

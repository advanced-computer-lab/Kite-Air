import React, { useState, useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";
import Test from "./Test.js";

const HeaderPic = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0);

  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: myRef.current,
          THREE: THREE,
          color: 0x000000,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 600.0,
          minWidth: 600.0,
          skyColor: 0x191b3a, // 0x2a386e,
          sunColor: 0xfffffff,
          sunGlareColor: 0x383e89,
          sunlightColor: 0x0,
          speed: 0.4,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={myRef}>
      <br />
      <section className="showcase">
        <div className="showcase-overlay">
          <h1 style={{ color: "white" }}>Kite Airlines</h1>
          <p>Making the sky the best place to be!</p>

          <Test
            setRetFlights={props.setRetFlights}
            setDepFlights={props.setDepFlights}
            setSearchData={props.setSearchData}
            setshowEmpty={props.setshowEmpty}
          />
        </div>
      </section>
    </div>
  );
};

export default HeaderPic;

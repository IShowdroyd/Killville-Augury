import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="custom-navbar" style={{
      width: "100vw",
      height: 68,
      background: "#141614",
      display: "flex",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      borderBottom: "none",
      boxShadow: "none",
      padding: 0,
    }}>
      {/* Espaço esquerdo */}
      <div style={{flex: 1, minWidth: 0}}></div>
      {/* Centro */}
      <div style={{
        flex: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        lineHeight: 1.05,
      }}>
        <span style={{
          fontFamily: "'Bodoni Moda', serif",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 400,
          letterSpacing: 0.7,
          marginTop: 2,
          marginBottom: -2,
        }}>This is</span>
        <span style={{
          fontFamily: "'Bodoni Moda', serif",
          color: "#ececec",
          fontSize: "1.6rem",
          fontWeight: 700,
          letterSpacing: 1.2,
          lineHeight: 1,
        }}>Augury</span>
      </div>
      {/* Direita */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 48,
      }}>
        <button
          className="navbar-comic"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            color: "#ececec",
            fontSize: "1.25rem",
            cursor: "pointer",
            letterSpacing: 1,
            background: "none",
            border: "none",
            textTransform: "uppercase",
            fontWeight: 700,
            transition: "color 0.18s",
          }}
          onClick={() => navigate("/comic")}
        >COMIC</button>
      </div>
    </nav>
  );
}

import React, { useEffect, useRef } from "react";

const LoginGoogle = () => {
  const outputRef = useRef(null);

  useEffect(() => {
    /* global google */
    window.handleCredentialResponse = (response) => {
      console.log("[DEBUG] ID Token dari Google:", response.credential);

      fetch("https://quizku-production.up.railway.app/auth/login-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          const output = outputRef.current;

          if (
            data.status === "success" &&
            data.data &&
            data.data.access_token
          ) {
            const accessToken = data.data.access_token;
            output.textContent =
              "✅ Login sukses!\n\nAccess Token:\n" + accessToken;

            // 🔥 Kirim token ke endpoint /api/u/tokens
            fetch("https://quizku-production.up.railway.app/api/u/tokens", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken, // hapus kalau endpoint tidak perlu auth
              },
              body: JSON.stringify({ token: accessToken }),
            })
              .then((res) => res.json())
              .then((result) => {
                console.log("[TOKEN POSTED]", result);
                output.textContent +=
                  "\n\n🚀 Token berhasil dikirim ke server!";
              })
              .catch((err) => {
                console.error("[POST ERROR]", err);
                output.textContent +=
                  "\n\n❌ Gagal kirim token: " + err.message;
              });
          } else {
            output.textContent =
              "❌ Login gagal: " + (data.error || "Token tidak ditemukan.");
          }
        })
        .catch((err) => {
          console.error("[LOGIN ERROR]", err);
          outputRef.current.textContent = "❌ Login gagal: " + err.message;
        });
    };

    // Render tombol Google Sign-In
    window.google?.accounts.id.initialize({
      client_id:
        "330051036041-8src8un315p823ap640hv70vp3448ruh.apps.googleusercontent.com",
      callback: window.handleCredentialResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "outline", size: "large" }
    );

    window.google?.accounts.id.prompt();
  }, []);

  return (
    <div>
      <h1>Login with Google</h1>
      <div id="google-signin-btn"></div>
      <pre
        ref={outputRef}
        style={{
          marginTop: 20,
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
};

export default LoginGoogle;

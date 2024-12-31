import React, { useEffect, useState } from "react";
import FireworksComponent from "./components/firework";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Phát âm thanh sau khi trang web được tải xong
    const launchSound = new Audio(
      process.env.PUBLIC_URL + "/sounds/launch.mp3"
    );

    // Delay một chút để tránh lỗi khi không có sự tương tác của người dùng
    const timer = setTimeout(() => {
      launchSound.play().catch((error) => {
        console.log("Không thể phát âm thanh:", error);
      });
      setIsPlaying(true); // Đánh dấu trạng thái âm thanh đang phát
    }, 100); // Delay 100ms để tránh lỗi phát âm thanh tự động

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App" style={{ margin: 0, padding: 0, overflow: "hidden" }}>
      <FireworksComponent />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingTop: "20vh",
          color: "#fff",
        }}
      >
        {isPlaying ? (
          <>
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
              }}
            >
              Chúc Mừng Năm Mới!
            </h1>
            <p
              style={{
                fontSize: "1.5rem",
                background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
              }}
            >
              Kính chúc một năm tràn đầy niềm vui và thành công!
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                opacity: 0.8,
              }}
            >
              Thưởng thức màn bắn pháo hoa rực rỡ chào đón năm mới!
            </p>
          </>
        ) : (
          <div style={{ opacity: 0 }}>...</div> // Có thể ẩn đi phần tử này nếu không cần thiết.
        )}
      </div>
    </div>
  );
}

export default App;

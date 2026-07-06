import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import OrderOfPower from "./components/OrderOfPower";
import Lineage from "./components/Lineage";
import Timeline from "./components/Timeline";
import Facts from "./components/Facts";
import Search from "./components/Search";
import About from "./components/About";
import Modal from "./components/Modal";
import References from "./components/References";

function App() {
  const [activeTab, setActiveTab] = useState("power");
  const [selectedEmperor, setSelectedEmperor] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSelectEmperor = (emperor) => {
    setSelectedEmperor(emperor);
  };

  const handleCloseModal = () => {
    setSelectedEmperor(null);
  };

  return (
    <div className={`min-h-screen bg-cork ${darkMode ? "dark" : ""} transition-colors`}>
      <Header />
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />

      <main>
        {activeTab === "power" && <OrderOfPower />}
        {activeTab === "lineage" && <Lineage onSelectEmperor={handleSelectEmperor} />}
        {activeTab === "timeline" && <Timeline />}
        {activeTab === "facts" && <Facts />}
        {activeTab === "search" && <Search onSelectEmperor={handleSelectEmperor} />}
        {activeTab === "references" && <References />}
        {activeTab === "about" && <About />}
      </main>

      <Modal emperor={selectedEmperor} onClose={handleCloseModal} />
    </div>
  );
}

export default App;

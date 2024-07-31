import CustomerHeader from "./_components/CustomerHeader";

export default function Home() {
  return (
    <div>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="main-input-wrapper">
          <input type="text" className="select-input" placeholder="select place" />
          <input type="text" className="search-input" placeholder="Enter food or restaurant name" />
        </div>
      </div>
    </div>
  );
}

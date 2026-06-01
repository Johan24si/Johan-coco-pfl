import Button from "./Button";

export default function HeroSection({ title, subtitle, buttonText, onButtonClick, className = "" }) {
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center rounded-2xl shadow-lg ${className}`}>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">{title}</h1>
      <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      {buttonText && (
        <Button 
          type="primary" 
          className="bg-white !text-blue-700 hover:bg-gray-50 shadow-md font-bold px-8 py-3 rounded-full text-base" 
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}

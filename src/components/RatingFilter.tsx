import React from "react";

interface RatingFilterProps {
  onChange: (input: string) => void;
  value: string;
}

const RatingFilter = ({ onChange, value }: RatingFilterProps) => {
  return (
    <div className="max-w-xs">
      <input
        type="range"
        min={1}
        max="10"
        value={value}
        className="range"
        step="1"
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-between px-2.5 mt-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <div className="flex justify-between px-2.5 mt-2 text-xs">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default RatingFilter;

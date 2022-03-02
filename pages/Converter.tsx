import { useState } from "react";

interface LandSystems{
    ropani: number;
    squareMeters: number;
    squareFeet: number;
    paisa: number;
    aana: number;
    daam: number;
    bigah: number;
    dhur: number;
    kattha: number;
}

const Converter = () => {
  const [state, setState] = useState<LandSystems>({
    ropani: 0,
    squareMeters: 0,
    squareFeet: 0,
    paisa: 0,
    aana: 0,
    daam: 0,
    bigah: 0,
    dhur: 0,
    kattha: 0,
  });

  let {
    ropani,
    squareMeters,
    squareFeet,
    paisa,
    aana,
    daam,
    kattha,
    dhur,
    bigah,
  } = state;

  const resetState = () => {
    setState({
      ropani: 0,
      squareMeters: 0,
      squareFeet: 0,
      paisa: 0,
      aana: 0,
      daam: 0,
      bigah: 0,
      dhur: 0,
      kattha: 0,
    });
  };

  const sqmToBigah = () => {
    // dhur = +squareFeet / 182.25;
    dhur = +squareMeters / 16.93;

    // ropani = squareFeet / 5476;
    // let tempAanaDec = (ropani % 5476) * 16;
    // let tempAanaRec = ropani - tempAanaDec
    // console.log('object', { tempAanaDec, tempAanaRem })

    if (dhur >= 20) {
      let tempDhurDec = dhur % 20;
      let tempDhurWhole = dhur - tempDhurDec;
      dhur = tempDhurDec;
      kattha = tempDhurWhole / 20;
      if (kattha >= 20) {
        let tempKatthaDec = kattha % 20;
        let tempKatthaWhole = kattha - tempKatthaDec;
        kattha = tempKatthaDec;
        bigah = tempKatthaWhole / 20;
      }
    } else {
      bigah -= bigah;
      kattha -= kattha;
    }
  };

  const sqmToRopani = () => {
    let daamValue = squareFeet / 21.39;
    // let daamValue = squareMeters / 1.99;

    daam = daamValue;
    if (daam >= 4) {
      let tempDaamDec = +daamValue % 4;
      let tempDaamWhole = +daamValue - tempDaamDec;
      daam = +tempDaamDec;
      let tempPaisaValue = +tempDaamWhole / 4;
      paisa = tempPaisaValue;
      if (tempPaisaValue >= 4) {
        let tempPaisaDec = +tempPaisaValue % 4;
        let tempPaisaWhole = +tempPaisaValue - +tempPaisaDec;
        paisa = +tempPaisaDec;
        aana = +tempPaisaWhole / 4;
        if (aana >= 16) {
          let tempAanaDec = aana % 16;
          let tempAanaWhole = aana - tempAanaDec;
          aana = tempAanaDec;
          ropani = tempAanaWhole / 16;
        }
      }
    } else {
      ropani -= ropani;
      aana -= aana;
      paisa -= paisa;
    }
  };

  const converter = (name:string, value:number) => {
    switch (name) {
      case "squareMeters":
        squareMeters = +value;
        squareFeet = +value * 10.76;
        sqmToBigah();
        sqmToRopani();
        break;

      case "ropani":
        ropani = +value;
        let totalRopani = +value + +aana / 16 + +paisa / 64 + +daam / 256;
        squareMeters = +totalRopani * 508.73;
        // squareFeet = +squareMeters * 10.76;
        squareFeet = +totalRopani * 5476;

        sqmToBigah();
        break;

      case "aana":
        aana = +value;
        let totalAana = +(ropani * 16 + +value + +paisa / 4 + +daam / 16);
        squareMeters = totalAana * 31.796;
        // squareFeet = squareMeters * 10.76;
        squareFeet = totalAana * 342.25;

        sqmToBigah();
        break;
      case "paisa":
        paisa = +value;
        let totalPaisa = +(ropani / 64 + +aana / 16 + +value + +daam * 4);
        squareMeters = totalPaisa * 7.95;
        // squareFeet = squareMeters * 10.76;
        squareFeet = totalPaisa * 85.5625;

        sqmToBigah();
        break;

      case "daam":
        daam = +value;
        let totalDaam = +(ropani * 256 + +aana * 16 + +paisa * 4 + +value);
        squareMeters = totalDaam * 1.99;
        // squareFeet = squareMeters * 10.76;
        squareFeet = totalDaam * 21.39;

        sqmToBigah();
        break;
      case "bigah":
        bigah = +value;
        let totalBigah = +value + +kattha / 20 + +dhur / (20 * 20);
        squareMeters = totalBigah * 6772.41;
        squareFeet = +totalBigah * 72900;
        // squareFeet = +squareMeters * 10.76;

        sqmToRopani();

        break;
      case "kattha":
        kattha = +value;
        let totalKattha = bigah / 20 + +value + +dhur * 20;
        squareMeters = totalKattha * 338.62;
        squareFeet = totalKattha * 3645;
        // squareFeet = squareMeters * 10.76;

        sqmToRopani();

        break;
      case "dhur":
        dhur = +value;
        let totalDhur = bigah / 400 + +kattha * 20 + +value;
        squareMeters = totalDhur * 16.93;
        squareFeet = totalDhur * 182.25;
        // squareFeet = squareMeters * 10.76;

        sqmToRopani();

        break;
      case "squareFeet":
        squareFeet = +value;
        squareMeters = +value / 10.76;
        sqmToBigah();
        sqmToRopani();

        break;
      default:
        return state;
    }

    setState({
      ropani,
      squareMeters,
      squareFeet,
      paisa,
      aana,
      daam,
      kattha,
      dhur,
      bigah,
    });
  };

  const onChange = (e:any, name:string) => {
    e.preventDefault();
    const { value } = e.target;
    converter(name, value);
  };

  return (
    <div className="container">
     
      
      <div>
        <h4>Ropani System</h4>
        <label htmlFor="inputField">
          Ropani
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={ropani}
            type="number"
            onChange={(e) => onChange(e, "ropani")}
          />
        </label>
        <label htmlFor="inputField">
          Aana
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={aana}
            type="number"
            onChange={(e) => onChange(e, "aana")}
          />
        </label>
        <label htmlFor="inputField">
          Paisa
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={paisa}
            type="number"
            onChange={(e) => onChange(e, "paisa")}
          />
        </label>
        <label htmlFor="inputField">
          Daam
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={daam}
            type="number"
            onChange={(e) => onChange(e, "daam")}
          />
        </label>
      </div>
      <div>
        <h4>Bigah System</h4>
        <label htmlFor="inputField">
          Bigah
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={bigah}
            type="number"
            onChange={(e) => onChange(e, "bigah")}
          />
        </label>
        <label htmlFor="inputField">
          Kattha
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={kattha}
            type="number"
            onChange={(e) => onChange(e, "kattha")}
          />
        </label>
        <label htmlFor="inputField">
          Dhur
          <input
            id="inputField"
            className="unit-input"
            placeholder="0"
            value={dhur}
            type="number"
            onChange={(e) => onChange(e, "dhur")}
          />
        </label>
      </div>
      <div>
        <h4>Square Meters</h4>
        <label htmlFor="inputField">
          Square Meters
          <input
            id="inputField"
            value={squareMeters}
            className="unit-input"
            onChange={(e) => onChange(e, "squareMeters")}
            placeholder="0"
            type="number"
          />
        </label>
      </div>
      <div>
        <h4>Square Feet</h4>
        <label htmlFor="inputField">
          Square Feet
          <input
            id="inputField"
            value={squareFeet}
            className="unit-input"
            onChange={(e) => onChange(e, "squareFeet")}
            placeholder="0"
            type="number"
          />
        </label>
          </div>
          <div className="button-container">
          <button  onClick={resetState} className="button-24" role="button">Reset</button>
      </div>
    </div>
  );
};

export default Converter;

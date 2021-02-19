/*
 * @LastEditors: yym
 * @Date: 2021-02-19 10:29:26
 * @LastEditTime: 2021-02-19 18:01:04
 * @Email: 15764302140@163.com
 * @Description:
 */
let data = [
  {name: 'Arizona', value: 147, id: 123},
  {name: 'Nevada', value: 224, id: 124},
  {name: 'Colorado', value: 152, id: 125},
  {name: 'Oklahoma', value: 153, id: 126},
  {name: 'Missouri', value: 154, id: 127},
  {name: 'NorthCarolina', value: 157, id: 128},
  {name: 'SouthCarolina', value: 169, id: 129}
];

let geoCoordMap = {
  Arizona: [-110.40542375000001, 35.35565578125001],
  Nevada: [-117.43667375000001, 38.65155421875001],
  Colorado: [-103.72573625000001, 38.16815578125001],
  Oklahoma: [-98.58413468750001, 35.04803859375001],
  Missouri: [-91.99233781250001, 38.43182765625001],
  NorthCarolina: [-81.35757218750001, 35.70721828125001],
  SouthCarolina: [-81.44546281250001, 33.68573390625001]
};

let cubeData = [
  {name: 'Arizona', rateValue: 89.4, coord: [-110.40542375000001, 35.35565578125001]},
  {name: 'Nevada', rateValue: 79.4, coord: [-117.43667375000001, 38.65155421875001]},
  {name: 'Colorado', rateValue: 59.4, coord: [-103.72573625000001, 38.16815578125001]},
  {name: 'Oklahoma', rateValue: 94.4, coord: [-98.58413468750001, 35.04803859375001]},
  {name: 'Missouri', rateValue: 78.4, coord: [-91.99233781250001, 38.43182765625001]},
  {name: 'NorthCarolina', rateValue: 90.4, coord: [-81.35757218750001, 35.70721828125001]},
  {name: 'SouthCarolina', rateValue: 91.4, coord: [-81.44546281250001, 33.68573390625001]}
];

let formatNum = function(f, digit) {
  var m = Math.pow(10, digit);
  return parseInt(f * m, 10) / m;
};

const mapData = {
  data,
  geoCoordMap,
  cubeData,
  formatNum
};
export default mapData;

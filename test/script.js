console.log('script loaded');

let sampleData = [
    {
        collegeName: 'XYZ',
        building: [
            [
                {
                    name: 'B1',
                    floors: [
                        {
                            floor1: 'F1',
                            labs: [
                                { name: 'F1 L1', Q: 100, B: 10 },
                                { name: 'F1 L2', Q: 100, B: 10 },
                            ],
                        },
                        {
                            floor1: 'F2',
                            labs: [
                                { name: 'F2 L1', Q: 100, B: 10 },
                                { name: 'F2 L2', Q: 100, B: 10 },
                            ],
                        },
                    ],
                },
            ],
            [
                {
                    name: 'B2',
                    floors: [
                        {
                            floor1: 'F1',
                            labs: [
                                { name: 'F1 L1', Q: 100, B: 10 },
                                { name: 'F1 L2', Q: 100, B: 10 },
                            ],
                        },
                        {
                            floor1: 'F2',
                            labs: [
                                { name: 'F2 L1', Q: 100, B: 10 },
                                { name: 'F2 L2', Q: 100, B: 10 },
                            ],
                        },
                    ],
                },
            ],
        ],
    },
];

let sampleData2 = [
    {
        collegeName: 'XYZ',
        building: [
            [
                'B1',
                [
                    [
                        'B1 F1',
                        [
                            ['B1 F1 L1', '100', '10'],
                            ['B1 F1 L2', '100', '10'],
                        ],
                    ],
                    [
                        'B1 F2',
                        [
                            ['B1 F2 L1', '100', '10'],
                            ['B1 F2 L2', '100', '10'],
                        ],
                    ],
                ],
            ],
            [
                'B2',
                [
                    [
                        'B2 F1',
                        [
                            ['B2 F1 L1', '50', '5'],
                            ['B2 F1 L2', '50', '5'],
                        ],
                    ],
                    [
                        'B2 F2',
                        [
                            ['B2 F2 L1', '50', '5'],
                            ['B2 F2 L2', '50', '5'],
                        ],
                    ],
                ],
            ],
        ],
    },
];

let nodeTree = document.getElementById('node-tree');

let buildingsArr = sampleData2[0].building;

let html = '';
const generateLi = (buildings) => {
    buildings.forEach((building, i) => {
        html += `<li id='buildingLi${i + 1}'>${building[0]}</li>`;
    });
};
generateLi(buildingsArr);

let finalHTML = `<ul> 
                    <li> ${sampleData2[0].collegeName} 
                        <ul>  
                            ${html}
                        </ul>
                    </li>
                </ul>`;
nodeTree.innerHTML = finalHTML;

sampleData2[0].building.forEach((building, i) => {
    let floor = building[1];
    let floorHtml = floor.map((floor, i) => {
        return `<li id='floorLi${i + 1}'>${floor[0]}</li>`;
    });
    document.getElementById(
        `buildingLi${i + 1}`
    ).innerHTML += `<ul> ${floorHtml} </ul>`;
});

sampleData2[0].building.forEach((building, i) => {
    let floors = building[1];
    floors.forEach((floor, i) => {
        let labs = floor[1];
        let labHtml = labs.map((lab, i) => {
            return `<li> ${lab[0]} </li>`;
        });
        // console.log(labHtml.join(''));
        document.getElementById(
            `floorLi${i + 1}`
        ).innerHTML += `<ul> ${labHtml.join('')} </ul>`;
    });
});

function generateHtml(arr) {
    let listHtml = '';

    if (arr.length > 1) {
        arr.forEach((el, i) => {
            listHtml += `<li> ${el[0]} </li>`;
        });
    }

    let html = `<ul>${listHtml}<ul>`;

    console.log(html);
    return html;
}

let nodeTree1 = document.getElementById('node-tree2');

nodeTree1.innerHTML += `<ul> 
                            <li> 
                                ${sampleData2[0].collegeName}  
                            </li> 
                            ${generateHtml(buildingsArr)} 
                        </ul>`;

buildingsArr.forEach((el, i) => {
    // console.log(el);

    generateHtml(el[1]);
});

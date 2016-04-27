var sourceMock = {
  externalId:"source_mock_ext_id",
  name: null,
  url:"http://some_url/source.mock&some?otherInformation",
  nhits:100,
  hasCustomIcon:null,
  markerIcon:"1d81fb7658ce5fd827d88f4a4dcd0658ba9f88c2.png",
  sourceIcon:"1d81fb7658ce5fd827d88f4a4dcd0658ba9f88c2.png",
  synchronized: false,
  notifiable: false
};

var toolMock = {
  autoConfig: null,
  description : {}
};

var optionMock = {
  isUsed: null,
  configured: null,
  computePrice: null,
  getContent: null,
  removeOption: null,
  widgetConf: {
    namespace: "namespace",
    handler: null
  },
  description : {
    message: [],
    name: "optionName",
    confirm:false,
    display: true,
    type: null,
    contentTag : {
      tag: "contentTagTag",
      location: "contentTagLocation"
    }
  }
};

var enablerMock = {
  isUsed: null,
  computePrice: null,
  field: "field",
  description : {
    name: "enablerName",
    type: "enabler"
  }
};

var templateMock = {
  templateTag: "tag",
  name: "templateName",
  templateDescription: { name: "template 1" },
  options:[optionMock],
  tools:[toolMock],
  targets: ["android","ios"]
};

var sampleMock = {
  templateTag: "tag",
  parentName: "templateName",
  name: "sample",
  custom: { "templateTag": "tag", generationId:'123456789' },
  templateDescription: { name: "template 2" }
};

var stepMock = {
  mandatory: null,
  multiple: null,
  type: null,
  mockup: null,
  property: null
};

var mailMock = "monMail@orange.fr";

var generationMock = {
  templateTag:"tag",
  name:"Mocking Generation",
  customIcon:false,
  version:"0.0.0",
  portal:{ name:"dma" },
  targets:["android"],
  sources:[sourceMock],
  gpxFiles:[],
  pictureFiles:[],
  customSplashscreen:false,
  _id:"5447c3ade4b03b371896764f"
};

var userMock = {
  email: null,
  firstName: null,
  lastName: null,
  emailProtected : false,
  password : null,
  confirmPassword : null,
  phoneNumber : null
};

export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-HSTF6SXB.js"
    ],
    "route": "/portfolio/digital-builds"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AFIEI3RB.js"
    ],
    "route": "/portfolio/visual-stories"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IXLKQQHL.js"
    ],
    "route": "/portfolio/moving-frames"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3DI54ECK.js"
    ],
    "route": "/portfolio/original-tracks"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5DPIBQPB.js"
    ],
    "route": "/portfolio/portfolio"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5MOQAUJJ.js"
    ],
    "route": "/portfolio/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DLUFRF3C.js"
    ],
    "route": "/portfolio/contact"
  },
  {
    "renderMode": 2,
    "route": "/portfolio/home"
  },
  {
    "renderMode": 2,
    "redirectTo": "/portfolio/home",
    "route": "/portfolio/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17797, hash: 'd5521265a0266637a2c6eae6f8e1f4e1e301c3d622a09eae95392c3a12d9f6c4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17387, hash: '3d3280204b91c364dd3d805fd41af8c59f35f765d817715dba9d21fdaf9f5801', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'digital-builds/index.html': {size: 21511, hash: '270c9f40e4fec5d9abc49ad05093e1dfb371d5ecac88c4841211ced3d6af0bd7', text: () => import('./assets-chunks/digital-builds_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 21282, hash: '237ead0d18ae898348cbc7b25895e0072dc541767c2529dcd033d68c8e4bc021', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'visual-stories/index.html': {size: 21893, hash: '3de4f1c82a36111e48dcc330f7c916a50dd49f4f3a2443794dc4e8112d129f3a', text: () => import('./assets-chunks/visual-stories_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 25412, hash: '151de0d093ad76d48035b8cf83bd069edeabf5d7e6544232a45994e79f9323a8', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'moving-frames/index.html': {size: 21293, hash: '9a4e2880413256879b113d9e7c4fc53c782ee3c4ef1cbe634b41a450d9b0f99e', text: () => import('./assets-chunks/moving-frames_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 23494, hash: 'af2e5b45374c55919ce27766cff2853309656d8359cabdf888e39347e61fbb06', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'original-tracks/index.html': {size: 21297, hash: '6f3cad92920baa501a4b3cfa69902e5e4c5bd0bc13a231dc974b69f4ce22b3f1', text: () => import('./assets-chunks/original-tracks_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 28878, hash: 'dcfa44a103d054c72529218ceeb9bd1573f9885d73d730a9fb0bbf2c11d16709', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'styles-WIUCB7FA.css': {size: 74796, hash: '3U97F0t/0JM', text: () => import('./assets-chunks/styles-WIUCB7FA_css.mjs').then(m => m.default)}
  },
};

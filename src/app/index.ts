import { createApp } from 'vue';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

import './index.css';
import Root from './root.vue';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

createApp(Root).mount('#app');

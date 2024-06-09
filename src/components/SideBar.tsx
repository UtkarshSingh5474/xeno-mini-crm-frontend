'use client'
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { menuItems } from './MenuItems';


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const variantItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};


const MenuItem = ({ item }:any) => {
  const router = useRouter();

  return (
    <motion.div
      variants={variantItem}
      key={item.name}
      className="relative group"
    >
      <a
        href="#"
        onClick={() => router.push(item.href)}
        className="flex items-center justify-center sm:justify-center w-full py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
      >
        {item.svg}
        <span className="sr-only group-hover:not-sr-only group-hover:ml-3 transition-opacity duration-200 ease-in-out">{item.name}</span>
      </a>
    </motion.div>
  );
};

const Sidebar = () => {
  const router = useRouter();

  return (
    <motion.aside
      transition={{ duration: 0.2 }}
      initial={{ x: -88 }}
      animate={{ x: 0 }}
      className="hidden sm:flex sm:flex-col shadow-lg bg-gray-800 hover:w-56 w-20 transition-all duration-200 ease-in-out group"
      style={{ boxShadow: '4px 0 15px -5px rgba(0, 0, 0, 0.6)' }}
    >
      <a
        href="#"
        onClick={() => router.push('/dashboard')}
        className="inline-flex items-center justify-center h-20 w-full bg-blue-600 transition-all duration-200 ease-in-out"
      >
        <svg width="70" height="18" viewBox="0 0 70 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.73845 8.82232L0.266214 0.810976H4.22988L7.9717 6.57144L11.7283 0.810976H15.6772L10.1754 8.82232L15.9582 17.2038H11.9797L7.9717 11.0584L3.94888 17.2038H0L5.73845 8.82232ZM25.3201 0.5C26.7794 0.5 28.0316 0.801104 29.0768 1.40331C30.1219 2.00552 30.9255 2.85947 31.4875 3.96516C32.0495 5.07085 32.3305 6.39371 32.3305 7.93382V9.79964H21.4008C21.4403 11.3891 21.8642 12.6133 22.6728 13.4721C23.4911 14.331 24.6349 14.7605 26.104 14.7605C27.1491 14.7605 28.0858 14.6617 28.9141 14.4643C29.7522 14.257 30.6149 13.9559 31.5023 13.561V16.3894C30.6839 16.7744 29.8507 17.0558 29.0028 17.2335C28.1548 17.4112 27.1393 17.5 25.9561 17.5C24.3489 17.5 22.934 17.189 21.7114 16.5671C20.4987 15.9352 19.5472 14.9974 18.857 13.7535C18.1767 12.5096 17.8365 10.9646 17.8365 9.11847C17.8365 7.28221 18.1471 5.72241 18.7683 4.43903C19.3894 3.15563 20.262 2.17828 21.3861 1.50697C22.5101 0.835657 23.8214 0.5 25.3201 0.5ZM25.3201 3.12108C24.2257 3.12108 23.3383 3.47649 22.658 4.18729C21.9875 4.89809 21.5931 5.93962 21.4748 7.31187H28.9289C28.919 6.49244 28.7809 5.76685 28.5147 5.13502C28.2584 4.5032 27.864 4.00959 27.3316 3.65419C26.809 3.29879 26.1385 3.12108 25.3201 3.12108ZM44.7835 0.5C46.6273 0.5 48.0617 0.978804 49.0873 1.93641C50.1229 2.88415 50.6402 4.40941 50.6402 6.51218V17.2038H47.1647V7.16379C47.1647 5.89023 46.9034 4.93758 46.3808 4.30575C45.8582 3.66406 45.0497 3.34321 43.9553 3.34321C42.3678 3.34321 41.2635 3.83189 40.6423 4.80924C40.0311 5.78658 39.7254 7.20327 39.7254 9.05926V17.2038H36.2498V0.810976H38.9563L39.4444 3.03223H39.6366C39.9916 2.45964 40.4304 1.99071 40.9529 1.62544C41.4854 1.25029 42.077 0.968931 42.7277 0.781359C43.3884 0.593786 44.0736 0.5 44.7835 0.5ZM70 8.9704C70 10.3328 69.8226 11.5421 69.4678 12.5984C69.113 13.6548 68.5951 14.5482 67.9148 15.2788C67.2345 15.9994 66.4162 16.5523 65.4595 16.9373C64.5032 17.3125 63.4238 17.5 62.2209 17.5C61.0968 17.5 60.0665 17.3125 59.1294 16.9373C58.1929 16.5523 57.3794 15.9994 56.6894 15.2788C56.0091 14.5482 55.4817 13.6548 55.1067 12.5984C54.7322 11.5421 54.5447 10.3328 54.5447 8.9704C54.5447 7.16379 54.8552 5.63355 55.4764 4.37979C56.1077 3.11615 57.0048 2.1536 58.1683 1.49216C59.3318 0.830721 60.717 0.5 62.3243 0.5C63.833 0.5 65.1638 0.830721 66.3177 1.49216C67.4711 2.1536 68.373 3.11615 69.024 4.37979C69.675 5.64347 70 7.17366 70 8.9704ZM58.1241 8.9704C58.1241 10.1649 58.2669 11.1867 58.553 12.0357C58.8487 12.8847 59.302 13.5363 59.9136 13.9904C60.5247 14.4347 61.3136 14.6568 62.28 14.6568C63.2459 14.6568 64.0349 14.4347 64.6465 13.9904C65.2575 13.5363 65.7061 12.8847 65.9922 12.0357C66.2782 11.1867 66.421 10.1649 66.421 8.9704C66.421 7.77583 66.2782 6.76395 65.9922 5.93466C65.7061 5.09553 65.2575 4.45877 64.6465 4.02439C64.0349 3.58014 63.2411 3.35802 62.2651 3.35802C60.8256 3.35802 59.7756 3.84176 59.115 4.80924C58.4544 5.77671 58.1241 7.16379 58.1241 8.9704Z" fill="#ffffff"/>
        </svg>
        <span className="hidden group-hover:inline-block ml-2 font-bold text-white">Mini CRM</span>
      </a>
      <div className="flex-grow flex flex-col justify-between text-gray-500">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col mx-4 my-6 space-y-4"
        >
          {menuItems.map((item) => (
            <MenuItem item={item} key={item.name} />
          ))}
        </motion.nav>
      </div>
    </motion.aside>
  );
};


export default Sidebar;


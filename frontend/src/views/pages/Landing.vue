<script setup>
import { ref } from 'vue';

const tabs = ref([
    { title: 'Title 1', content: 'Content 1', value: '0' },
    { title: 'Title 2', content: 'Content 2', value: '1' },
    { title: 'Title 3', content: 'Content 3', value: '2' }
]);
function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>
<!-- TODO: Replace landing page -->
<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <a class="flex items-center" href="#">
                    <img src="/demo/images/logo.svg" class="rounded-xl w-9 h-9 mr-2" alt="Jejak Kerja" />
                    <span
                        class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-normal mr-20 pr-10 whitespace-nowrap">Jejak
                        Kerja</span>
                </a>
                <Button class="lg:!hidden" text severity="secondary" rounded
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }">
                    <i class="pi pi-bars !text-2xl"></i>
                </Button>
                <div
                    class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
                    <ul
                        class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                        <li>
                            <a @click="smoothScroll('#hero')"
                                class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#features')"
                                class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Features</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')"
                                class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Highlights</span>
                            </a>
                        </li>
                        <!-- <li>
                            <a @click="smoothScroll('#pricing')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Pricing</span>
                            </a>
                        </li> -->
                    </ul>
                    <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                        <Button label="Login" text as="router-link" to="/auth/login" rounded></Button>
                        <Button label="Register" as="router-link" to="/auth/register" rounded></Button>
                    </div>
                </div>
            </div>

            <div id="hero" class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
                style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)">
                <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                    <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span class="font-light block">Welcome
                            to</span>Jejak Kerja</h1>
                    <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Effortlessly track your job
                        applications and progress with Jejak Kerja—your partner in staying on top of every opportunity!"
                    </p>
                    <Button label="Get Started" as="router-link" to="/auth/login" rounded
                        class="!text-xl mt-8 !px-4"></Button>
                </div>
                <div class="flex justify-center md:justify-end">
                    <img src="/demo/images/landing/jejak-kerja.png" alt="Hero Image" class="w-9/12 md:w-auto" />
                </div>
            </div>

            <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                <div class="grid grid-cols-12 gap-4 justify-center">
                    <div class="col-span-12 text-center mt-20 mb-6">
                        <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Marvelous Features
                        </div>
                        <span class="text-muted-color text-2xl">Features that we offer</span>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <div class="flex items-center justify-center bg-yellow-200 mb-4"
                                    style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-users !text-2xl text-yellow-700"></i>
                                </div>
                                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Easy to Use</h5>
                                <span class="text-surface-600 dark:text-surface-200">Simple and intuitive.</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))">
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <div class="flex items-center justify-center bg-cyan-200 mb-4"
                                    style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-palette !text-2xl text-cyan-700"></i>
                                </div>
                                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Fresh Design</h5>
                                <span class="text-surface-600 dark:text-surface-200">Clean, modern interface & organized
                                    layout</span>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))">
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <div class="flex items-center justify-center bg-indigo-200"
                                    style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-map !text-2xl text-indigo-700"></i>
                                </div>
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Well
                                    Documented</div>
                                <span class="text-surface-600 dark:text-surface-200">Non arcu risus quis varius quam
                                    quisque.</span>
                            </div>
                        </div>
                    </div> -->

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg-4 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))">
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <div class="flex items-center justify-center bg-purple-200 mb-4"
                                    style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-eye !text-2xl text-purple-700"></i>
                                </div>
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">
                                    Privacy</div>
                                <span class="text-surface-600 dark:text-surface-200">Your data is protected with robust
                                    security measures.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Reviews -->
                    <!-- <div class="col-span-12 mt-20 mb-20 p-2 md:p-20"
                        style="border-radius: 20px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)">
                        <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                            <div class="text-gray-900 mb-2 text-3xl font-semibold">Joséphine Miller</div>
                            <span class="text-gray-600 text-2xl">Peak Interactive</span>
                            <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-6"
                                style="max-width: 800px">
                                “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.”
                            </p>
                            <img src="/demo/images/landing/peak-logo.svg" class="mt-6" alt="Company logo" />
                        </div>
                    </div> -->
                </div>
            </div>

            <div id="highlights" class="py-6 px-6 lg:px-20 mx-0 my-12 lg:mx-20">
                <div class="text-center">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Powerful Everywhere
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4 mt-20 pb-2 md:pb-20">
                    <div class="flex justify-center col-span-12 lg:col-span-6 p-0 order-1 lg:order-none"
                        style="border-radius: 8px">
                        <img src="/demo/images/landing/checklist.svg" class="w-11/12" alt="mockup mobile" />
                    </div>

                    <div
                        class="col-span-12 lg:col-span-6 my-auto flex flex-col lg:items-end text-center lg:text-right gap-4">
                        <div class="flex items-center justify-center bg-purple-200 self-center lg:self-end"
                            style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-list !text-4xl text-purple-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Centralized
                            Job Tracker</div>
                        <span class="text-surface-700 dark:text-surface-100 text-2xl leading-normal ml-0 md:ml-2"
                            style="max-width: 650px">Our job application tracker simplifies your job search by
                            centralizing all your applications from any platform in one place. With an intuitive design,
                            a modern interface, and robust privacy features, it helps you stay organized and secure
                            throughout your job hunt.</span>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4 my-20 pt-2 md:pt-20">
                    <div
                        class="col-span-12 lg:col-span-6 my-auto flex flex-col text-center lg:text-left lg:items-start gap-4">
                        <div class="flex items-center justify-center bg-yellow-200 self-center lg:self-start"
                            style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-question !text-3xl text-yellow-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal mb-4">
                            Frequently
                            Asked Questions</div>
                        <div class="w-full">
                            <Accordion value="0">
                                <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
                                    <AccordionHeader class="accordion-header">{{ tab.title }}</AccordionHeader>
                                    <AccordionContent class="accordion-content">
                                        <p class="m-0">{{ tab.content }}</p>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                        </div>
                    </div>

                    <div class="flex justify-end order-1 sm:order-2 col-span-12 lg:col-span-6 p-0"
                        style="border-radius: 8px">
                        <img src="/demo/images/landing/question.svg" class="w-11/12" alt="mockup" />
                    </div>
                </div>
            </div>

            <!-- <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
                <div class="text-center mb-6">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Matchless Pricing</div>
                    <span class="text-muted-color text-2xl">Amet consectetur adipiscing elit...</span>
                </div>

                <div class="grid grid-cols-12 gap-4 justify-between mt-20 md:mt-0">
                    <div class="col-span-12 lg:col-span-4 p-0 md:p-4">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">Free</div>
                            <img src="/demo/images/landing/free.svg" class="w-10/12 mx-auto" alt="free" />
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">$0</span>
                                    <span class="text-surface-600 dark:text-surface-200">per month</span>
                                </div>
                                <Button label="Get Started" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Responsive Layout</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Unlimited Push Messages</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">50 Support Ticket</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Free Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">Startup</div>
                            <img src="/demo/images/landing/startup.svg" class="w-10/12 mx-auto" alt="startup" />
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">$1</span>
                                    <span class="text-surface-600 dark:text-surface-200">per month</span>
                                </div>
                                <Button label="Get Started" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Responsive Layout</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Unlimited Push Messages</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">50 Support Ticket</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Free Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">Enterprise</div>
                            <img src="/demo/images/landing/enterprise.svg" class="w-10/12 mx-auto" alt="enterprise" />
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">$5</span>
                                    <span class="text-surface-600 dark:text-surface-200">per month</span>
                                </div>
                                <Button label="Get Started" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Responsive Layout</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Unlimited Push Messages</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">50 Support Ticket</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Free Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="py-6 px-6 mx-0 mt-20 lg:mx-20">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-12">
                        <a @click="smoothScroll('#home')"
                            class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-4 cursor-pointer">
                            <img src="/demo/images/logo.svg" class="rounded-xl w-9 h-9 mr-2" alt="Jejak Kerja" />
                            <h4 class="font-medium text-3xl text-surface-900 dark:text-surface-0">Jejak
                                Kerja</h4>
                        </a>
                    </div>
                    <div class="flex flex-row gap-4">
                        <a href="https://github.com/themuaz97" target="_blank">
                            <i class="pi pi-github text-2xl text-surface-900 dark:text-surface-0"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/muazazmen/" target="_blank">
                            <i class="pi pi-linkedin text-2xl text-blue-400"></i>
                        </a>
                    </div>

                    <div class="col-span-12 md:col-span-10">
                        <div class="grid grid-cols-12 gap-8 text-center md:text-left">
                            <!-- <div class="col-span-12 md:col-span-3">
                                <h4
                                    class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">
                                    Company</h4>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">About
                                    Us</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">News</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Investor
                                    Relations</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Careers</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">Media
                                    Kit</a>
                            </div> -->

                            <!-- <div class="col-span-12 md:col-span-3">
                                <h4
                                    class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">
                                    Resources</h4>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Get
                                    Started</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Learn</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">Case
                                    Studies</a>
                            </div> -->

                            <!-- <div class="col-span-12 md:col-span-3">
                                <h4
                                    class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">
                                    Community</h4>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Discord</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Events<img
                                        src="/demo/images/landing/new-badge.svg" class="ml-2" /></a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">FAQ</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">Blog</a>
                            </div> -->

                            <!-- <div class="col-span-12 md:col-span-3">
                                <h4
                                    class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">
                                    Legal</h4>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Brand
                                    Policy</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Privacy
                                    Policy</a>
                                <a
                                    class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">Terms
                                    of Service</a>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Divider />
        <div class="flex justify-center items-center pb-4">
            <span>Copyright &copy; 2025 Jejak Kerja. All Rights Reserved.</span>
        </div>
    </div>
</template>
<style scoped>
.accordion-header {
    color: var(--code-background);
    font-size: 1.5rem;
    font-weight: bold;
}

:root[class*=app-dark] .accordion-header {
    color: var(--code-color);
}

.accordion-content {
    color: var(--code-background);
    font-size: 1.2rem;
}

:root[class*=app-dark] .accordion-content {
    color: var(--code-color);
}

</style>

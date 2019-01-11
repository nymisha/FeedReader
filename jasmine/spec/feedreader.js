                /* feedreader.js
                 *
                 * This is the spec file that Jasmine will read and contains
                 * all of the tests that will be run against your application.
                 */

                /* We're placing all of our tests within the $() function,
                 * since some of these tests may require DOM elements. We want
                 * to ensure they don't run until the DOM is ready.
                 */
                $(function () {
                    /* This is our first test suite - a test suite just contains
                     * a related set of tests. This suite is all about the RSS
                     * feeds definitions, the allFeeds variable in our application.
                     */
                    describe('RSS Feeds', function () {
                        /* This is our first test - it tests to make sure that the
                         * allFeeds variable has been defined and that it is not
                         * empty. Experiment with this before you get started on
                         * the rest of this project. What happens when you change
                         * allFeeds in app.js to be an empty array and refresh the
                         * page?
                         */
                        it('are defined', function () {
                            expect(allFeeds).toBeDefined();
                            expect(allFeeds.length).not.toBe(0);
                        });


                        /* TODO: Write a test that loops through each feed
                         * in the allFeeds object and ensures it has a URL defined
                         * and that the URL is not empty.
                         */

                        it('Feed Url exist and is not empty for a feed', function () {

                            for (const feed of allFeeds) {
                                expect(feed.url).toBeDefined();
                                expect(feed.url).not.toBe(null);
                                expect(feed.url).not.toBe('');
                            }

                        });

                        /* TODO: Write a test that loops through each feed
                         * in the allFeeds object and ensures it has a name defined
                         * and that the name is not empty.
                         */
                        it('Feed name exist and is not empty for a feed', function () {

                            for (const feed of allFeeds) {
                                expect(feed.name).toBeDefined();
                                expect(feed.name).not.toBe(null);
                                expect(feed.name).not.toBe('');
                            }

                        });


                    });


                    /* TODO: Write a new test suite named "The menu" */


                    describe('The menu', function () {


                        var body = $('body');
                        var menuIcon = $(".menu-icon-link");
                        var menuHidden = $('.menu-hidden')
                        var menuIcon = $('.menu-icon-link');

                        /* TODO: Write a test that ensures the menu element is
                         * hidden by default. You'll have to analyze the HTML and
                         * the CSS to determine how we're performing the
                         * hiding/showing of the menu element.
                         */

                        /* If the body element has a class by name menu-hidden. check for not null and length 1 and true conditions */
                        it('menu element is hidden by default', function () {
                            expect(body.hasClass("menu-hidden")).toBe(true);
                            expect(menuHidden).not.toBe(null);
                            expect(menuHidden.length).toBe(1);
                        })


                        /* TODO: Write a test that ensures the menu changes
                         * visibility when the menu icon is clicked. This test
                         * should have two expectations: does the menu display when
                         * clicked and does it hide when clicked again.
                         */

                        it('menu is toggled when icon is clicked', function () {
                            //when menu clicked for first time
                            menuIcon.trigger('click');
                            //expecting menu is not hidden
                            expect(body.hasClass("menu-hidden")).toBe(false);
                            //when menu clicked again
                            menuIcon.trigger('click');
                            //expecting menu should be hidden
                            expect(body.hasClass("menu-hidden")).toBe(true);
                        });

                    });
                    /* TODO: Write a new test suite named "Initial Entries" */
                    describe('Initial Entries', function () {

                        /* TODO: Write a test that ensures when the loadFeed
                         * function is called and completes its work, there is at least
                         * a single .entry element within the .feed container.
                         * Remember, loadFeed() is asynchronous so this test will require
                         * the use of Jasmine's beforeEach and asynchronous done() function.
                         */

                        beforeEach(function (done) {
                            setTimeout(function () {
                                //call the loadfeed function passing done() function as call back
                                loadFeed(0, done);
                            });
                        });

                        it('.Feed container is not empty once the loadFeed function completes', function () {
                            expect($('.feed').children().length).not.toBeLessThan(0);
                            expect($('.entry').find('h2')[0].textContent).not.toBe(null);
                            expect($('.entry').find('h2')[0].textContent).toBeDefined();
                        });
                    });




                    /* TODO: Write a new test suite named "New Feed Selection" */

                    /* TODO: Write a test that ensures when a new feed is loaded
                     * by the loadFeed function that the content actually changes.
                     * Remember, loadFeed() is asynchronous.
                     */



                    describe('New Feed Selection', function () {

                        var initialContent, finalContent;
                        beforeEach(function (done) {
                            setTimeout(function () {
                                //call the loadFeed function qith id=3 and call back function
                                loadFeed(3, function () {
                                    finalContent = $('.feed').find('h2')[0].textContent;
                                    //signal that first call to loadFeed is done
                                    done();
                                    //call the loadFeed function again from the callback function with done as the callback function
                                    loadFeed(0, done);
                                    initialContent = $('.feed').find('h2')[0].textContent;
                                });
                            });
                        });

                        it('New Feed is loaded by the loadFeed function', function () {
                            //expect initialContent is not equal to finalContent
                            expect(initialContent).not.toEqual(finalContent);
                        });

                    });
                }());
describe("gettext", function () {

    beforeAll(function () {
        StoneTest.index.addCatalogs(CATALOGS);
    });

    describe("setLocale", function () {

        it("can switches the locale", function () {
            StoneTest.index.setLocale("fr");
            expect(StoneTest.index.getLocale()).toEqual("fr");
        });

    });

    describe("gettext", function () {

        it("can translates strings", function () {
            StoneTest.index.setLocale(null);
            expect(StoneTest.index.gettext("Hello World")).toEqual("Hello World");
            StoneTest.index.setLocale("xx");
            expect(StoneTest.index.gettext("Hello World")).toEqual("Hello World");
            StoneTest.index.setLocale("en");
            expect(StoneTest.index.gettext("Hello World")).toEqual("Hello World");
            StoneTest.index.setLocale("fr");
            expect(StoneTest.index.gettext("Hello World")).toEqual("Bonjour le monde");
            StoneTest.index.setLocale("it");
            expect(StoneTest.index.gettext("Hello World")).toEqual("Buongiorno il mondo");
        });

        it("can translates strings with replacements", function () {
            StoneTest.index.setLocale(null);
            expect(StoneTest.index.gettext("Hello {name}", {name: "John"})).toEqual("Hello John");
            StoneTest.index.setLocale("xx");
            expect(StoneTest.index.gettext("Hello {name}", {name: "John"})).toEqual("Hello John");
            StoneTest.index.setLocale("en");
            expect(StoneTest.index.gettext("Hello {name}", {name: "John"})).toEqual("Hello John");
            StoneTest.index.setLocale("fr");
            expect(StoneTest.index.gettext("Hello {name}", {name: "John"})).toEqual("Bonjour John");
            StoneTest.index.setLocale("it");
            expect(StoneTest.index.gettext("Hello {name}", {name: "John"})).toEqual("Buongiorno John");
        });

    });

    describe("lazyGettext", function () {

        it("can translates strings", function () {
            var s = StoneTest.index.lazyGettext("Hello World");
            StoneTest.index.setLocale(null);
            expect(String(s)).toEqual("Hello World");
            StoneTest.index.setLocale("fr");
            expect(String(s)).toEqual("Bonjour le monde");
        });

        it("can translates  strings with replacements", function () {
            var s = StoneTest.index.lazyGettext("Hello {name}", {name: "John"});
            StoneTest.index.setLocale(null);
            expect(String(s)).toEqual("Hello John");
            StoneTest.index.setLocale("fr");
            expect(String(s)).toEqual("Bonjour John");
        });

    });

    describe("LazyString", function () {

        beforeAll(function () {
            StoneTest.index.setLocale("fr");
        });

        beforeEach(function () {
            this.lazy = new StoneTest.index.LazyString("Hello World");
        });

        it("can translate text", function () {
            expect(this.lazy.toString()).toEqual("Bonjour le monde");
        });

        it("can mimic the String API", function () {
            var stringProps = Object.getOwnPropertyNames(String.prototype);
            var lazyProps = Object.getOwnPropertyNames(this.lazy);
            for (var i = 0 ; i < stringProps.length ; i++) {
                expect(lazyProps).toContain(stringProps[i]);
            }
        });

        it("can give the translated string length", function () {
            expect(this.lazy.length).toEqual(16);
        });

        it("can return the translated string in lowerCase", function () {
            expect(this.lazy.toLowerCase()).toEqual("bonjour le monde");
        });

        it("can return a splitted translated string", function () {
            expect(this.lazy.split(" ")).toEqual(["Bonjour", "le", "monde"]);
        });

    });

});

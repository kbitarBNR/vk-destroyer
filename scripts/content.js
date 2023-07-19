const xpathElement = '//span[contains(text(), "Virtual Kitchen")]//ancestor::div/a[@data-anchor-id=\'StoreCard\']/..';
const xpathOtherElements = [
    '//h3[contains(text(), "Apps All Around")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Arthur Treacher")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Bad Mutha Clucka")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Bad-Ass Breakfast Burritos")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Biscuit Sammies")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Burger Den")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Burger Experience")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Buster\'s American Kitchen")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Chicken Sammy")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Conviction Chicken")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Coop & Run")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Cosmic Wings")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Dockside Chardive")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Empanada Alley")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Fresh Set")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Guy Fieri")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Hootie\'s")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Ice Cream Shoppe")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Just Wings")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "MrBeast Burger")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Nathan\'s Famous")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Neighborhood Wings")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "P.Za Kitchen")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Pardon My Cheesesteak")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Pasqually\’s Pizza & Wings")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "RA Sushi")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Roadies Sdivders")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Tender Shack")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "TenderFix")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Twisted Mac")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Twisted Tenders")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Tyga Bites")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wild Burger")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wing Boss")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wing Dept")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wing Experience")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wing Town")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wingville")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wing Town")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Wow Bao")]/ancestor::div[@data-testid="store-card"]',
    '//h3[contains(text(), "Zombie Burger")]/ancestor::div[@data-testid="store-card"]'
];

let mo;

function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
    console.log('Element removed:', element);
  }
}

function onMutation(mutations) {
  let stopped;
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const xpathResult = document.evaluate(
          xpathElement,
          node,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );
        if (xpathResult.snapshotLength > 0) {
          stopped = true;
          mo.disconnect();
          for (let i = 0; i < xpathResult.snapshotLength; i++) {
            const element = xpathResult.snapshotItem(i);
            removeElement(element);
          }
        }

        for (const xpath of xpathOtherElements) {
          const otherXPathResult = document.evaluate(
            xpath,
            node,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
          );
          if (otherXPathResult.snapshotLength > 0) {
            stopped = true;
            mo.disconnect();
            for (let i = 0; i < otherXPathResult.snapshotLength; i++) {
              const element = otherXPathResult.snapshotItem(i);
              removeElement(element);
            }
          }
        }
      }
    }
  }
  if (stopped) {
    observe();
  }
}

function observe() {
  mo = new MutationObserver(onMutation);
  mo.observe(document, { childList: true, subtree: true });
  console.log('Observing DOM mutations...');
}

// In case the content script was injected after the page is partially loaded
onMutation([{ addedNodes: [document.documentElement] }]);
observe();
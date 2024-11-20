class TabStackClass {
  private stack: string[];

  constructor(initialTab?: string) {
    this.stack = initialTab ? [initialTab] : [];
  }

  moveToPrevTab(): string | null {
    if (this.stack.length === 0) {
      return null;
    }

    this.stack.pop();

    return this.currentTab();
  }

  moveToNextTab(tab: string): void {
    if (!tab) {
      return;
    }

    this.stack.push(tab);
  }

  resetTab(): void {
    while (this.stack.length > 0) {
      this.stack.pop();
    }
  }

  currentTab(): string | null {
    if (this.stack.length === 0) {
      return null;
    }
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}

export default TabStackClass;

# UI Chat Bot FAFTECH-AI
![UI](https://github.com/fikriaf/faftech-ai/blob/main/wfwrw.PNG)

# Faftech-AI

Faftech-AI is an interactive web interface built with HTML, CSS, and JavaScript, utilizing Bootstrap for responsive layout, Prism.js for syntax highlighting, and various other interactive features. This project is designed to provide a modern and intuitive UI.

## Key Features

1. **Multi-AI Support**: Interface with two interaction panels to communicate with two AI models simultaneously.
2. **Code Highlighting**: Uses Prism.js to highlight syntax in code blocks.
3. **Flexible Interaction**:
   - Button to copy code to clipboard with visual feedback.
   - File input integrated with two control buttons.
   - Keyboard shortcut support for data submission.
4. **Responsive Layout**: Built with Bootstrap 5.3.3 to ensure compatibility across devices.
5. **Offcanvas Menu**: For additional settings such as resetting history.

## Technologies Used

- **HTML5**: Base structure of the page.
- **CSS3**: Additional styles to enhance the interface.
- **Bootstrap 5.3.3**: To build a responsive layout.
- **Prism.js**: Syntax highlighting for code.
- **JavaScript**: Interactive logic such as clipboard, file input, and dynamic buttons.
- **Font Awesome & Bootstrap Icons**: Icons for UI elements.

## How to Use

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/fikriarmiafahmi/faftech-ai.git
   cd faftech-ai
   ```

2. **Run in Browser**:
- Make sure you have a local server like Laragon or XAMPP.
- Place the project folder in your server directory (htdocs or equivalent).
- Access the page via browser, for example: http://localhost/faftech-ai

3. **Input and Interaction Features**:
- Enter text into the input textarea.
- Use the following shortcuts to send:
  - Send to both AIs: CTRL + ENTER
  - Send to the left: CTRL + ALT + L
  - Send to the right: CTRL + ALT + R
- Use the folder or plus buttons to upload a file.

4. **Reset History**:
- Open the offcanvas menu using the grid icon.
- Click the "Reset History" button.

## Project Structure
├── index.html       # Main page
<br>
├── style.css        # Custom styles
<br>
├── script.js        # Interactive logic
<br>
├── prismjs/
<br>
│   ├── prism.css    # Syntax highlighting styles
<br>
│   └── prism.js     # Syntax highlighting script
<br>
├── README.md        # Project documentation

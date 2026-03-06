class Calculator {
	constructor() {
		this.num1Input = document.getElementById('num1');
		this.num2Input = document.getElementById('num2');
		this.resultDisplay = document.getElementById('result');
		
		this.initEventListeners();
	}
	
	initEventListeners() {
		// Получаем все кнопки операций
		document.querySelectorAll('.operation-btn').forEach(btn => {
			btn.addEventListener('click', (e) => this.handleOperation(e));
		});
		
		// Обработка клавиши Enter при выборе кнопки по Tab
		document.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				const activeOperation = document.querySelector('.operation-btn:hover');
				if (activeOperation) {
					activeOperation.click();
				}
			}
		});
	}
	
	handleOperation(event) {
		const button = event.currentTarget;
		const operation = button.dataset.operation;
		
		// Добавляем анимацию нажатия
		button.style.animation = 'scale(0.95)';
		setTimeout(() => {
			button.style.animation = '';
		}, 100);
		
		const num1 = this.num1Input.value;
		const num2 = this.num2Input.value;
		
		if (!this.validateInputs(num1, num2)) {
			return;
		}
		
		const number1 = parseFloat(num1);
		const number2 = parseFloat(num2);
		let result;
		
		switch(operation) {
			case 'sum':
				result = this.sum(number1, number2);
				break;
			case 'difference':
				result = this.difference(number1, number2);
				break;
			case 'multiply':
				result = this.multiply(number1, number2);
				break;
			case 'division':
				if (number2 === 0) {
					this.showError('Ошибка: деление на ноль невозможно');
					return;
				}
				result = this.division(number1, number2);
				break;
			default:
				return;
		}
		
		this.displayResult(result);
		
		// Очищаем поля ввода после вычисления
		this.clearInputs();
	}
	
	sum(num1, num2) {return num1 + num2;}
	difference(num1, num2) {return num1 - num2;}
	multiply(num1, num2) {return num1 * num2;}
	division(num1, num2) {return num1 / num2;}
	
	validateInputs(num1, num2) {
		if (num1 === '' || num2 === '') {
			this.showError('Пожалуйста, заполните оба поля');
			return false;
		}
		
		if (isNaN(num1) || isNaN(num2)) {
			this.showError('Пожалуйста, введите корректные числа');
			return false;
		}
		
		return true;
	}
	
	displayResult(result) {
		this.resultDisplay.textContent = this.formatResult(result);
		this.resultDisplay.classList.add('success');
		this.resultDisplay.classList.remove('error');
		this.resultDisplay.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
	}
	
	showError(message) {
		this.resultDisplay.textContent = message;
		this.resultDisplay.classList.add('error');
		this.resultDisplay.classList.remove('success');
		
		// Добавляем фон и анимацию встряхивания
		this.resultDisplay.style.background = 'linear-gradient(135deg, #FF0000 0%, #ff6c6c 100%)';
		this.resultDisplay.style.animation = 'shake 0.5s ease';
		setTimeout(() => {
			this.resultDisplay.style.animation = '';
		}, 500);
	}
	
	formatResult(result) {
		// Форматируем результат с учетом десятичных знаков
		if (Number.isInteger(result)) {
			return result.toString();
		} else {
			// Округляем до 4 знаков после запятой
			return result.toFixed(4).replace(/\.?0+$/, '');
		}
	}
	
	clearInputs() {
		this.num1Input.value = '';
		this.num2Input.value = '';
		
		// Устанавливаем фокус на первое поле
		this.num1Input.focus();
	}
}

// Инициализация калькулятора после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
	new Calculator();
});
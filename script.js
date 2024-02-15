// script.js
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            courses {
              title
              price
            }
          }
        `,
      }),
    });

    const data = await response.json();
    displayData(data.data.courses);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

function displayData(courses) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  if (courses.length === 0) {
    resultContainer.innerHTML = 'No courses found.';
    return;
  }

  const ul = document.createElement('ul');
  courses.forEach(course => {
    const li = document.createElement('li');
    li.textContent = `${course.title} by ${course.price}`;
    ul.appendChild(li);
  });

  resultContainer.appendChild(ul);
}

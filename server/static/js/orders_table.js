function deleteOrder(id) {
    if (confirm('Are you sure you want to delete this order?')) {
      var form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', '/orders/' + id + '/delete/');

      var csrf = document.createElement('input');
      csrf.setAttribute('type', 'hidden');
      csrf.setAttribute('name', 'csrfmiddlewaretoken');
      csrf.setAttribute('value', '{{ csrf_token }}');
      form.appendChild(csrf);

      document.body.appendChild(form);
      form.submit();
    }
  }
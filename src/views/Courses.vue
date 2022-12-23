<template>
<div>
<h3> Courses  </h3>
<table>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Semester</th>
            <th>Credits</th>
            <th>Description</th>
          </tr>
          <tr class="item" v-for="course in courses" :key="course.id">
            <td>{{ course.code }} </td>
            <td>{{ course.title }} </td>

            <td> {{ course.semester }}</td>

            <td>{{ course.credits }} </td>
            <td>{{ course.description }} </td>
          </tr>


</table> 
</div>
</template>

<script>
export default {
  name: "Courses",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    fetchCourses() {
      fetch(`http://localhost:3000/api/courses/`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
   },
  },
  mounted() {
    this.fetchCourses();
    console.log("mounted");
  } 
};
</script>

<style scoped>

</style>
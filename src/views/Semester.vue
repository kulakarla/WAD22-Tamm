<template>
  <div>
    <h3> {{ semname }} </h3>
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
        <td v-if="course.description  === ''">No course description is provided</td>
        <td v-else>{{ course.description}}</td>
      </tr>

    </table>

    <a :href="'/courses'">Back to courses</a>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
export default {
  name: "Semester",
  data() {
    return {
      courses: [],
      semname: '',
    };
  },
  methods: {
    fetchCourses(semname) {
      fetch(`http://localhost:3000/api/semesters/${semname}`)
          .then((response) => response.json())
          .then((data) => (this.courses = data))
          .catch((err) => console.log(err.message));
    }
  },
  mounted() {
    const route = useRoute();
    this.semname = route.params.semname;
    this.fetchCourses(route.params.semname);
    console.log("mounted");
  },
};
</script>

<style scoped>
th {
  background: rgb(100, 151, 122);
}

td {
  background: rgb(186, 228, 204);
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}


</style>